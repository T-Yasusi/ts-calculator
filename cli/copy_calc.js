#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('modules/calc');
const destDir = path.resolve('public/modules/calc');

function copyRecursiveSync(src, dest) {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    // ディレクトリなら作成して中を再帰コピー
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      const srcEntry = path.join(src, entry);
      const destEntry = path.join(dest, entry);
      copyRecursiveSync(srcEntry, destEntry);
    }
  } else if (stats.isFile()) {
    // ファイルなら単純コピー
    fs.copyFileSync(src, dest);
  }
}

// 実行
copyRecursiveSync(srcDir, destDir);
