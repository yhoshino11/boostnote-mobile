import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native'
import createMarkdownRenderer from 'rn-markdown'
const Markdown = createMarkdownRenderer({ gfm: true, tables: true })
import SyntaxHighlighter from 'react-native-syntax-highlighter'
import * as themes from 'react-syntax-highlighter/dist/styles'

const defaultTheme = themes['dracula']

const styles = StyleSheet.create({
    flex: 1
})

const itemContainerStyle = {
    flex: 1,
    paddingLeft:10,
    paddingTop:4,
    paddingBottom: 4,
    paddingRight:10
}

const markdownStyle = {
    container: {
        paddingLeft: 0
    },
    heading1: {
        fontSize: 24,
        fontWeight: '600',
        color: '#222222',
    },
    link: {
        color: 'red',
    },
    mail_to: {
        color: 'orange',
    },
    text: {
        color: '#555555',
    }
}

export const textToMarkdownAndCodeArray = (baseText) => {
    const codePattern = /(```)+(\S|\s)+?(```)/i

    if (codePattern.test(baseText)) {
        const mdBlock   = baseText.split(codePattern)[0]
        const codeBlock = baseText.match(codePattern)[0]
        const newText   = baseText.replace(mdBlock,'').replace(codeBlock,'')
        const nextArray = []

        if (mdBlock != '')   { nextArray.push(mdBlock) }
        if (codeBlock != '') { nextArray.push(codeBlock) }
        if (newText != '')   { nextArray.push(textToMarkdownAndCodeArray(newText)) }

        return [].concat.apply([],nextArray)
    } else {
        return [].concat.apply([],[baseText])
    }
}

class MarkdownPreview extends Component {

    codeComponent(args) {
        if (typeof args['text'] !== 'string') { return }
        const { syntaxFontSize, syntaxFontFamily } = this.props;

        const baseText = args['text']
        const theme    = args['theme'] || defaultTheme
        const codePrefix    = /^(```)+(\w|)+\n/i.exec(baseText)[0]
        const code          = baseText.replace(codePrefix,'').replace(/\n+(```)$/i,'')
        const lang          = codePrefix.replace(/^```/,'')
        const highLightlang = /^(\s)$/.test(lang) ? 'bash' : lang

        return (<SyntaxHighlighter
                    language={highLightlang}
                    style={theme}
                    fontSize={syntaxFontSize}
                    fontFamily={syntaxFontFamily}>{code}</SyntaxHighlighter>)
    }

    markdownComponent(args) {
        if (typeof args['text'] !== 'string') { return }

        const baseText       = args['text']
        const markdownStyle  = args['style'] || {}
        const containerStyle = args['containerStyle'] || {}

        return (<Markdown
                    contentContainerStyle={containerStyle}
                    markdownStyles={markdownStyle}>{baseText}</Markdown>)
    }

    textToItem(args) {
        if (typeof args['text'] != 'string' || args['text'] == '') { return }
        const { theme } = this.props;

        const baseText = args['text']

        if(/^(```)+(\w|)+\n/i.test(baseText)) {
            return (<View style={itemContainerStyle}>
                        {this.codeComponent({text: baseText, theme: themes[theme]})}
                    </View>)
        } else {
            return (<View style={itemContainerStyle}>
                        {this.markdownComponent({text: baseText, style: markdownStyle, containerStyle: {}})}
                    </View>)
        }
    }

    notePreviewAsFlatListData(args) {
        // Add markdown comment block at beginning of FlatList's data array,
        // so that it renders faster if original note starts with code block.
        const text = '[//]: #\n' + args['fullText'] + '\n[//]: #'
        const markdownAndCodeArray = textToMarkdownAndCodeArray(text)
        const markdownAndCodeComponentArray = markdownAndCodeArray.map((baseText, index) => {
            return {key: index, component: this.textToItem({text: baseText})}
        })

        return markdownAndCodeComponentArray
    }

    render() {
        const { text } = this.props;

        return (<View style={styles}>
                    <FlatList
                        data={this.notePreviewAsFlatListData({fullText: text})}
                        renderItem={({item}) => { return item.component }}
                        initialNumToRender={0}
                        {...this.props} />
                </View>)
    }
}

export default class NotePreview extends Component {

    render () {
        const { theme, syntaxFontSize, syntaxFontFamily, text } = this.props;

        return (<MarkdownPreview
                    theme={theme}
                    syntaxFontSize={syntaxFontSize}
                    syntaxFontFamily={syntaxFontFamily}
                    text={text} />)
    }
}
