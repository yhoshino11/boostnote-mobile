import { textToMarkdownAndCodeArray } from '../NotePreview.js'

test('split single markdown text to markdown and code array', () => {
    const md = "# foo \n*bar* ~baz~\n"
    const code = "```\n$ echo 'foo bar baz'\n```"

    const fixtures = [
      { param: '', outputArrayLength: 1},
      { param: md, outputArrayLength: 1},
      { param: code, outputArrayLength: 1},
      { param: md+md, outputArrayLength: 1},
      { param: md+code, outputArrayLength: 2},
      { param: code+code, outputArrayLength: 2},
      { param: md+code+md+md+code+md+md+code+code+md, outputArrayLength: 8}
    ]

    fixtures.forEach((testCase) => {
      expect(textToMarkdownAndCodeArray(testCase.param).length).toBe(testCase.outputArrayLength)
    })
})
