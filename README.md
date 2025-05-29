# このリポジトリの概要
このリポジトリはBabelプラグインによる演算子オーバーロードを用いたTypeScript開発環境構築を目的としている。
これらはNodeをメインとしたCLIによる環境とViteとMonaco Editorを用いたVS CodeライクなWebPageによるコード編集、実行環境がある。
数値計算ライブラリはこれら二つの環境で共有される。

## トランスパイルの仕組み
TypeScriptではJavaScriptにない演算子オーバーロードは使えない。
そこでBabelプラグイン`plugins/operator_overload.js`を用いてAST変換で演算子`a + b`を`add(a, b)`のように変換する。
変換されたTypeScriptコードは`tsc`(TSトランスパイラ)を用いて`*.ts -> *.js`と変換される。
演算子の実態は`calc/[add.ts| sub.ts| mul.ts| div.ts]`などに書かれている。

## 数値計算ライブラリ
```bash 
npm run build:calc
```
で生成される。これには演算子オーバーロードを含むものは`calc_src/**/*.ts`から`calc/**/*.ts`に変換され、これらは`calc/**/*.ts`から`modules/calc/**/*.js`に変換される。
前者には独自スクリプトが使われ、後者はは`tsc -p tsconfig.calc.json`のように`tsc`から`tsconfig.calc.json`を呼んでいる。

## テストスクリプト
```bash
node cli/ts_compile.js test/test.ts
```
とすることにより`temp/test.ts`に演算子オーバーロードされたものが`test-js/test/js`にTSコンパイルされたものが出力される。
