#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import * as babel from '@babel/standalone';
import operatorOverloadPlugin from '../plugins/operator_overload.js';

// CLI 引数
const [,, inputFile, outputFile] = process.argv;

if (!inputFile || !outputFile) {
  console.error("Usage: node transform.js input.js output.js");
  process.exit(1);
}

// 入力ファイルの読み込み
const inputCode = fs.readFileSync(inputFile, 'utf8');

// トランスパイルの実行
const { code } = babel.transform(inputCode, {
  plugins: [[operatorOverloadPlugin, { types: babel.types }]],
});

// 結果を書き出す
fs.writeFileSync(outputFile, code);
console.log(`✓ Transpiled: ${inputFile} → ${outputFile}`);
