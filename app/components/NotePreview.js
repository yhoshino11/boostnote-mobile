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
// Syntax highlight supported languages are listed here.
// https://github.com/conorhastings/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES.MD
// Syntax highlight supported themes are listed here.
// https://github.com/conorhastings/react-native-syntax-highlighter#styles-available
import {
    agate,
    androidstudio,
    arduinoLight,
    arta,
    ascetic,
    atelierCaveDark,
    atelierCaveLight,
    atelierDuneDark,
    atelierDuneLight,
    atelierEstuaryDark,
    atelierEstuaryLight,
    atelierForestDark,
    atelierForestLight,
    atelierHeathDark,
    atelierHeathLight,
    atelierLakesideDark,
    atelierLakesideLight,
    atelierPlateauDark,
    atelierPlateauLight,
    atelierSavannaDark,
    atelierSavannaLight,
    atelierSeasideDark,
    atelierSeasideLight,
    atelierSulphurpoolDark,
    atelierSurphulpoolLight,
    atomOneDark,
    atomOneLight,
    brownPaper,
    codepenEmbed,
    colorBrewer,
    dark,
    darkula,
    defaultStyle,
    docco,
    dracula,
    far,
    foundation,
    githubGist,
    github,
    googlecode,
    grayscale,
    gruvboxDark,
    gruvboxLight,
    hopscotch,
    hybrid,
    idea,
    irBlack,
    kimbieDark,
    kimbieLight,
    magula,
    monoBlue,
    monokaiSublime,
    monokai,
    obsidian,
    ocean,
    paraisoDark,
    paraisoLight,
    pojoaque,
    purebasic,
    qtcreatorDark,
    qtcreatorLight,
    railscasts,
    rainbow,
    schoolBook,
    solarizedDark,
    solarizedLight,
    sunburst,
    tomorrowNightBlue,
    tomorrowNightBright,
    tomorrowNightEighties,
    tomorrowNight,
    tomorrow,
    vs,
    xcode,
    xt256,
    zenburn
} from 'react-syntax-highlighter/dist/styles'

const theme = {
    'agate': agate,
    'androidstudio': androidstudio,
    'arduinoLight': arduinoLight,
    'arta': arta,
    'ascetic': ascetic,
    'atelierCaveDark': atelierCaveDark,
    'atelierCaveLight': atelierCaveLight,
    'atelierDuneDark': atelierDuneDark,
    'atelierDuneLight': atelierDuneLight,
    'atelierEstuaryDark': atelierEstuaryDark,
    'atelierEstuaryLight': atelierEstuaryLight,
    'atelierForestDark': atelierForestDark,
    'atelierForestLight': atelierForestLight,
    'atelierHeathDark': atelierHeathDark,
    'atelierHeathLight': atelierHeathLight,
    'atelierLakesideDark': atelierLakesideDark,
    'atelierLakesideLight': atelierLakesideLight,
    'atelierPlateauDark': atelierPlateauDark,
    'atelierPlateauLight': atelierPlateauLight,
    'atelierSavannaDark': atelierSavannaDark,
    'atelierSavannaLight': atelierSavannaLight,
    'atelierSeasideDark': atelierSeasideDark,
    'atelierSeasideLight': atelierSeasideLight,
    'atelierSulphurpoolDark': atelierSulphurpoolDark,
    'atelierSurphulpoolLight': atelierSurphulpoolLight,
    'atomOneDark': atomOneDark,
    'atomOneLight': atomOneLight,
    'brownPaper': brownPaper,
    'codepenEmbed': codepenEmbed,
    'colorBrewer': colorBrewer,
    'dark': dark,
    'darkula': darkula,
    'defaultStyle': defaultStyle,
    'docco': docco,
    'dracula': dracula,
    'far': far,
    'foundation': foundation,
    'githubGist': githubGist,
    'github': github,
    'googlecode': googlecode,
    'grayscale': grayscale,
    'gruvboxDark': gruvboxDark,
    'gruvboxLight': gruvboxLight,
    'hopscotch': hopscotch,
    'hybrid': hybrid,
    'idea': idea,
    'irBlack': irBlack,
    'kimbieDark': kimbieDark,
    'kimbieLight': kimbieLight,
    'magula': magula,
    'monoBlue': monoBlue,
    'monokaiSublime': monokaiSublime,
    'monokai': monokai,
    'obsidian': obsidian,
    'ocean': ocean,
    'paraisoDark': paraisoDark,
    'paraisoLight': paraisoLight,
    'pojoaque': pojoaque,
    'purebasic': purebasic,
    'qtcreatorDark': qtcreatorDark,
    'qtcreatorLight': qtcreatorLight,
    'railscasts': railscasts,
    'rainbow': rainbow,
    'schoolBook': schoolBook,
    'solarizedDark': solarizedDark,
    'solarizedLight': solarizedLight,
    'sunburst': sunburst,
    'tomorrowNightBlue': tomorrowNightBlue,
    'tomorrowNightBright': tomorrowNightBright,
    'tomorrowNightEighties': tomorrowNightEighties,
    'tomorrowNight': tomorrowNight,
    'tomorrow': tomorrow,
    'vs': vs,
    'xcode': xcode,
    'xt256': xt256,
    'zenburn': zenburn
}

const defaultTheme = dracula

const styles = StyleSheet.create({
    flex: 1
})

const baseContainerStyle = {
    flex: 1,
    paddingLeft:10,
    paddingTop:4,
    paddingBottom: 4,
    paddingRight:10,
    backgroundColor: '#F5FCFF'
}

const codeContainerStyle = Object.assign(baseContainerStyle, {
    backgroundColor: '#f0f0f0'
})

const markdownContainerStyle = Object.assign(baseContainerStyle, {
    backgroundColor: '#f0f0f0'
})

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
    },
    code: {
        backgroundColor: '#f0f0f0',
        marginTop: 5,
        marginBottom: 5
    },
    blockquote: {
        backgroundColor: '#f8f8f8',
        padding: 5
    }
}

// TODO: needs better regex
// test code at ../__tests__/NotePreview_module_test.js
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

    codeComponent = (args) => {
        if (typeof args['text'] !== 'string') { return }

        const baseText = args['text']
        const theme    = args['theme'] || defaultTheme
        const codePrefix    = /^(```)+(\w|)+\n/i.exec(baseText)[0]
        const code          = baseText.replace(codePrefix,'').replace(/\n+(```)$/i,'')
        const lang          = codePrefix.replace(/^```/,'')
        const highLightlang = /^(\s)$/.test(lang) ? 'bash' : lang

        return (<SyntaxHighlighter
                    language={highLightlang}
                    style={theme}
                    fontSize={this.props.syntaxFontSize}
                    fontFamily={this.props.syntaxFontFamily}>{code}</SyntaxHighlighter>)
    }

    markdownComponent = (args) => {
        if (typeof args['text'] !== 'string') { return }

        const baseText       = args['text']
        const markdownStyle  = args['style'] || {}
        const containerStyle = args['containerStyle'] || {}

        return (<Markdown
                    contentContainerStyle={containerStyle}
                    markdownStyles={markdownStyle}>{baseText}</Markdown>)
    }

    textToItem = (args) => {
        if (typeof args['text'] != 'string' || args['text'] == '') { return }

        const baseText = args['text']

        if(/^(```)+(\w|)+\n/i.test(baseText)) {
            return (<View style={codeContainerStyle}>
                        {this.codeComponent({text: baseText, theme: theme[this.props.theme]})}
                    </View>)
        } else {
            return (<View style={markdownContainerStyle}>
                        {this.markdownComponent({text: baseText, style: markdownStyle, containerStyle: {}})}
                    </View>)
        }
    }

    notePreviewAsFlatListData = (args) => {
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
        return (<View style={styles}>
                    <FlatList
                        data={this.notePreviewAsFlatListData({fullText: this.props.text})}
                        renderItem={({item}) => { return item.component }}
                        initialNumToRender={0}
                        {...this.props} />
                </View>)
    }
}

export default class NotePreview extends Component {

    render () {
        return (<MarkdownPreview
                    theme={this.props.theme}
                    syntaxFontSize={this.props.syntaxFontSize}
                    syntaxFontFamily={this.props.syntaxFontFamily}
                    text={this.props.text} />)
    }
}
