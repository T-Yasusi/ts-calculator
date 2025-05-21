import * as monaco from 'monaco-editor';

monaco.editor.create(document.getElementById('container')!, {
  value: [
    'function hello() {',
    '\tconsole.log("Hello from Monaco + Vite!");',
    '}',
    '',
    'hello();'
  ].join('\n'),
  language: 'typescript',
  theme: 'vs-dark',
  automaticLayout: true
});