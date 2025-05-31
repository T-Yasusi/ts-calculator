import * as monaco from 'monaco-editor';

export default function(htmlElement){
    return monaco.editor.create(htmlElement, {
        language: 'typescript',
        theme: 'vs-dark',
        lineNumbers: 'on',
        fontSize: 14,
        automaticLayout: true
    });
}

