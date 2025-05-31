import * as monaco from 'monaco-editor';
import * as Babel from '@babel/standalone';
import operatorOverloadPlugin from '/plugins/operator_overload.js';
import transformStaticImportToDynamic from '/plugins/transform-static-import-to-dynamic.js';
import * as esbuild from 'esbuild-wasm';

await esbuild.initialize({
    wasmURL: `${import.meta.env.BASE_URL}esbuild.wasm`,
    worker: true,
});

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
    const code = (await response.text()).replace(/\bconsole\.log\s*\(/g, 'consoleOutput(');
    console.log(code);
    editor.setValue(code);
});

document.getElementById('run').addEventListener('click', async () => {
    const originalCode = editor.getValue();
    console.log('Original Code', originalCode);
    
    try{
	const tsCode = Babel.transform(originalCode, {
	    presets: [ 'typescript' ],
	    plugins: [ operatorOverloadPlugin,
		       transformStaticImportToDynamic ],
	    filename: 'file.ts',
	}).code;
	console.log('TS Code', tsCode);

	// const result = await esbuild.transform(tsCode, {
	//     loader: 'ts',
	//     format: 'esm',
	//     sourcemap: false,
	// });

//	console.log(result.code);
	// ▼ Blob＋importによる実行
	const blob = new Blob([`(async () => { ${tsCode} })()`], { type: 'application/javascript' });
	// const blob = new Blob([result.code], { type: 'application/javascript' });
	const url = URL.createObjectURL(blob);
	const mod = await import(/* @vite-ignore */ url);
	URL.revokeObjectURL(url);	
//	document.getElementById('output').textContent = '成功';
//	eval(result.code);
    } catch(err) {
	console.log('Babel Transpile Error');
	console.log(err);
    }
});
