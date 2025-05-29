import * as monaco from 'monaco-editor';

const editor = monaco.editor.create(document.getElementById('editor'), {
  language: 'typescript',
  theme: 'vs-dark',
  lineNumbers: 'on',
  fontSize: 14,
  automaticLayout: true
});

document.getElementById('template').addEventListener('change', async (e) => {
    const value = e.target.value;
    console.log(value);
    const response = await fetch(`./test/${value}.ts`);
    const code = await response.text();
    console.log(code);
    editor.setValue(code);
});

document.getElementById('run').addEventListener('click', () => {
    const code = document.getElementById('editor').value;
    
    try {
	// あくまでテスト用：evalで擬似的に実行（要:今後トランスパイルやsandbox）
	document.getElementById('output').textContent = String(output);
    } catch (err) {
	document.getElementById('output').textContent = String(err);
    }
});
