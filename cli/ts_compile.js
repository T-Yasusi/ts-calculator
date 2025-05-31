#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { transformSync } from '@babel/core';
import syntaxTypeScript from '@babel/plugin-syntax-typescript';
import operatorOverloadPlugin from '../plugins/operator_overload.js';

// 入力・中間・出力ファイルパス（引数等で指定）
const inputFile = process.argv[2];   // e.g. test/test.ts
const tempFile = path.join('temp', path.basename(inputFile)); // e.g. temp/test.ts
const outputFile = path.join('test-js', path.basename(inputFile)).replace(/\.ts$/, '.js'); // e.g. test-js/test.js

if (!inputFile || !tempFile || !outputFile) {
  console.error('Usage: node operator_overload.js inputFile tempFile outputFile');
  process.exit(1);
}

// BabelでoperatorOverloadを適用
const inputCode = fs.readFileSync(inputFile, 'utf-8');
const { code } = transformSync(inputCode, {
    filename: inputFile,
    plugins: [
	syntaxTypeScript,
        operatorOverloadPlugin,
    ],
    sourceType: 'module',
});
fs.writeFileSync(tempFile, code);

// tscでtempFileをコンパイルしてoutputFileに出力
try {
  execSync(`npx tsc ${tempFile} --outDir ${path.dirname(outputFile)} --module ESNext --target ES2020 --esModuleInterop --allowJs false --noEmitOnError true`, { stdio: 'inherit' });
  console.log(`✓ Transpile success: ${tempFile} → ${outputFile}`);
} catch (e) {
  console.error('TS compilation failed');
  process.exit(1);
}
