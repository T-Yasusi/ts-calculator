#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { transformSync } from '@babel/core';
import glob from 'fast-glob';
import syntaxTypeScript from '@babel/plugin-syntax-typescript';
import operatorOverloadPlugin from '../plugins/operator_overload.js';

const inputRoot = 'calc_src';
const outputRoot = 'calc';

const files = await glob(`${inputRoot}/**/*.ts`);

for (const inputFile of files) {
  const relativePath = path.relative(inputRoot, inputFile);           // 例: "foo/bar.ts"
  const outputFile = path.join(outputRoot, relativePath).replace(/\.ts$/, '.ts'); // 例: "calc/foo/bar.js"

  const inputCode = fs.readFileSync(inputFile, 'utf-8');

  const { code } = transformSync(inputCode, {
      filename: inputFile,
      plugins: [
	  syntaxTypeScript,
	  operatorOverloadPlugin,
      ],
      sourceType: 'module',
  });

  // 出力先ディレクトリを作成
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });

//    console.log(code);
  // ファイル出力
  fs.writeFileSync(outputFile, code, 'utf-8');

  console.log(`✅ ${inputFile} → ${outputFile}`);
}
