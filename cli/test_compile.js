#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import glob from 'fast-glob';
import operatorOverload from './operatorOverload.js'

const files = await glob(`public/test/**/*.ts`);
console.log(files);

for (const inputFile of files) {
    const tempFile = path.join('temp', path.basename(inputFile)); 
    const outputFile = path.join('test-js', path.basename(inputFile)).replace(/\.ts$/, '.js');

    const inputCode = fs.readFileSync(inputFile, 'utf-8');
    const code = operatorOverload(inputCode, inputCode);
    fs.writeFileSync(tempFile, code);

    try {
	execSync(`npx tsc ${tempFile} --outDir ${path.dirname(outputFile)} --module ESNext --target ES2020 --esModuleInterop --allowJs false --noEmitOnError true`, { stdio: 'inherit' });
	console.log(`✓ Transpile success: ${tempFile} → ${outputFile}`);
    } catch (e) {
	console.error('TS compilation failed');
	process.exit(1);
    }

    console.log('=====', path.basename(inputFile), 'TEST START  ==================================================================');
    try {
	const stdout = execSync(`node ${outputFile}`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
	console.log(stdout);
	console.log('=====', path.basename(inputFile), 'TEST FINISH ==================================================================');
    } catch (e) {
	console.error('!!!!! InputFile :', inputFile, ' Error happen');
    }
}
