import createMonacoEditor from './createMonacoEditor.js'
import babelTransform from './babelTransform.js'

const editor = createMonacoEditor(document.getElementById('editor'));

document.getElementById('template').addEventListener('change', async (e) => {
    const value = e.target.value;
    if( value === 'no-code' ) editor.setValue('');
    else{
	const response = await fetch(`./test/${value}.ts`);
	const code = (await response.text()).replace(/\bconsole\.log\s*\(/g, 'consoleOutput(');
	editor.setValue(code);
    }
});

document.getElementById('run').addEventListener('click', async () => {
    const originalCode = editor.getValue();
    console.log('Original Code', originalCode);    
    try{
	const tsCode = babelTransform(originalCode);
	console.log('TS Code', tsCode);
	document.getElementById('output').innerText = '';
	const blob = new Blob([`(async () => { ${tsCode} })()`], { type: 'application/javascript' });
	const url = URL.createObjectURL(blob);
	const mod = await import(/* @vite-ignore */ url);
	URL.revokeObjectURL(url);	
    } catch(err) {
	console.log('Babel Transpile Error');
	console.log(err);
    }
});
