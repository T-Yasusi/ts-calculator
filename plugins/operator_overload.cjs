const operatorToFunction = {
  '+': 'add',
};

const importSource = './modules/calc/add.js';  // 1か所に全関数が集約されていると仮定

module.exports = function operatorOverloadPlugin({ types: t }) {
  console.log("✅ operator_overload plugin loaded");
  return {
    visitor: {
      Program(path) {
        // 使用された関数を記録して後で import 文を生成
        const usedFunctions = new Set();

        path.traverse({
          BinaryExpression(innerPath) {
            const { operator, left, right } = innerPath.node;
            const fname = operatorToFunction[operator];
            if (!fname) return;

            usedFunctions.add(fname);
            innerPath.replaceWith(
              t.callExpression(t.identifier(fname), [left, right])
            );
          },
        });

        // すでに import されていない関数をチェック
        const alreadyImported = new Set();
        for (const node of path.node.body) {
          if (
            t.isImportDeclaration(node) &&
            node.source.value === importSource
          ) {
            for (const spec of node.specifiers) {
              if (t.isImportSpecifier(spec)) {
                alreadyImported.add(spec.imported.name);
              }
            }
          }
        }

        const newImports = [...usedFunctions]
          .filter(fn => !alreadyImported.has(fn))
          .map(fn =>
            t.importSpecifier(t.identifier(fn), t.identifier(fn))
          );

        if (newImports.length > 0) {
          const importDecl = t.importDeclaration(
            newImports,
            t.stringLiteral(importSource)
          );
          path.unshiftContainer('body', importDecl);
        }
      },
    },
  };
};
