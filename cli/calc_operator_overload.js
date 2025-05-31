#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import glob from 'fast-glob';
import  operatorOverload from './operatorOverload.js'

const inputRoot = 'calc_src';
const outputRoot = 'calc';

const files = await glob(`${inputRoot}/**/*.ts`);

for (const inputFile of files) {
    const relativePath = path.relative(inputRoot, inputFile);
    const outputFile = path.join(outputRoot, relativePath).replace(/\.ts$/, '.ts');
    
    const inputCode = fs.readFileSync(inputFile, 'utf-8');
    
    const code = operatorOverload(inputCode, inputFile);

    // 出力先ディレクトリを作成
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, code, 'utf-8');

    console.log(`✅ ${inputFile} → ${outputFile}`);
}
