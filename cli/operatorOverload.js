import { transformSync } from '@babel/core';
import syntaxTypeScript from '@babel/plugin-syntax-typescript';
import operatorOverloadPlugin from '../plugins/operator_overload.js';

export default function(inputCode, filename='temp.ts'){
    return transformSync(inputCode, {
	filename: filename,
	plugins: [
            syntaxTypeScript,
            operatorOverloadPlugin,
	],
	sourceType: 'module',
    }).code;
}
