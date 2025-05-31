#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import  operatorOverload from './operatorOverload.js'

const inputFile = process.argv[2]; 
const tempFile = path.join('temp', path.basename(inputFile)); 
const outputFile = path.join('test-js', path.basename(inputFile)).replace(/\.ts$/, '.js');

if (!inputFile || !tempFile || !outputFile) {
  console.error('Usage: node operator_overload.js inputFile tempFile outputFile');
  process.exit(1);
}

const inputCode = fs.readFileSync(inputFile, 'utf-8');
const code = operatorOverload(inputCode, inputFile);
fs.writeFileSync(tempFile, code);

try {
  execSync(`npx tsc ${tempFile} --outDir ${path.dirname(outputFile)} --module ESNext --target ES2020 --esModuleInterop --allowJs false --noEmitOnError true`, { stdio: 'inherit' });
  console.log(`✓ Transpile success: ${tempFile} → ${outputFile}`);
} catch (e) {
  console.error('TS compilation failed');
  process.exit(1);
}
