# TypeScript Overload Math Environment

## 📝 概要

このプロジェクトは、**Babelプラグインを用いてTypeScriptに疑似的な演算子オーバーロードを導入**した、数値計算ライブラリおよびその実行環境です。

CLIツールとしても、**Vite + Monaco Editor** による**VSCode風のWeb IDE**としても動作し、数式を `a + b` のような直感的な記法で記述できます。内部では Babel により `add(a, b)` のように変換し、TypeScript → JavaScript にコンパイルされます。

▶️ **[オンラインデモはこちら](https://t-yasusi.github.io/ts-calculator/)**

---

## 🚀 主な特徴・機能

- 🔁 TypeScriptでの**疑似演算子オーバーロード**（`a + b → add(a, b)`）
- 🔧 **Babelプラグイン**による演算子変換
- 🔄 変換後に**TypeScriptをJavaScriptにコンパイル**
- 🖥️ CLIからのコード実行に対応
- 🌐 Vite + Monaco Editor による**Web IDE**
- 📐 数値演算・行列計算などに対応したライブラリ群

---

## 🛠️ 使用技術スタック

| 技術           | 用途                                         |
|----------------|----------------------------------------------|
| TypeScript     | 数値計算ライブラリのベース言語               |
| Babel Plugin   | 演算子オーバーロードの変換処理を実装         |
| Vite           | Web IDE 環境のビルドツール                   |
| Monaco Editor  | ブラウザ上でのVSCode風エディタ               |
| Node.js        | CLIツールの実行環境                          |

---

## 📁 ディレクトリ構成

```
index.html # Vite用エントリHTML（Web実行環境）
public/
└─ test/ # テストスクリプト（Web/CLI共用）

src/ # Vite + Monaco Editor のUI関連スクリプト

plugins/ # Babelプラグイン（Web/CLI共通）
temp/ # Babel変換済み（演算子オーバーロード後）の一時TSファイル

test-js/ # CLIで出力されたJavaScriptファイル
cli/ # CLI用トランスパイルツール類

calc_src/ # 演算子オーバーロード前のライブラリソース
└─ **/*.ts

calc/ # Babel変換後のTSライブラリ（TSのまま）
└─ **/*.ts

modules/
└─ calc/ # TS → JSにコンパイルされた本番ライブラリ
   └─ **/*.js
```

---

## ⚙️ ビルド・実行方法

### 🔧 数値計算ライブラリのビルド

演算子オーバーロードされた数値計算ライブラリを構築するために、以下の手順でトランスパイルを行います。

```bash
# Step 1: Babelプラグインでオーバーロード構文変換（calc_src → calc）
node cli/calc_operator_overload.js

# Step 2: TypeScript → JavaScript 変換（calc → modules/calc）
npm run build:calc

# 上記2ステップをまとめて実行するショートカット
npm run build:calc-full
```

### 🖥️ CLIからのコード実行
public/test/*.ts にあるテストコードをCLI経由で実行するには：

```bash
# 単一ファイルの変換・実行（例: test.ts）
node cli/ts_compile.js public/test/test.ts

# public/test/**/*.ts をすべて変換し、一括実行
node cli/test_compile.js
変換後の中間ファイルは temp/ に、最終的な実行ファイルは test-js/ に生成されます。
```

### 🌐 Web IDE（Vite + Monaco）の起動
```bash
npm run dev
```
起動後、ブラウザで http://localhost:5173 にアクセスしてください。

### 🌍 公開中のWebデモ
GitHub Pages 上で動作するWeb IDEを試すことができます：

🔗 https://t-yasusi.github.io/ts-calculator/

## 💬 ChatGPTの使用について

本プロジェクトのコード・ドキュメントの一部には ChatGPT（OpenAI）による支援を受けた要素が含まれています。


## 🪪 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](./LICENSE) ファイルをご覧ください。

