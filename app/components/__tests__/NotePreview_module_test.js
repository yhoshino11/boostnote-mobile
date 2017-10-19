import { textToMarkdownAndCodeArray } from '../NotePreview.js';

test('split single markdown text to markdown and code array', () => {
    const md = "# foo \n*bar* ~baz~\n";
    const code = "```\n$ echo 'foo bar baz'\n```"

    const input0 = '';
    expect(textToMarkdownAndCodeArray(input0).length).toBe(1);

    const input1 = md;
    expect(textToMarkdownAndCodeArray(input1).length).toBe(1);

    const input2 = code;
    expect(textToMarkdownAndCodeArray(input2).length).toBe(1);

    const input3 = md+md;
    expect(textToMarkdownAndCodeArray(input3).length).toBe(1);

    const input4 = md+code;
    expect(textToMarkdownAndCodeArray(input4).length).toBe(2);

    const input5 = code+code;
    expect(textToMarkdownAndCodeArray(input5).length).toBe(2);

    const input6 = code+code+md+md+code+md+md+code+code+md;
    expect(textToMarkdownAndCodeArray(input6).length).toBe(8);
});
