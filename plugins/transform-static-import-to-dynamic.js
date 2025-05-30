export default function ({ types: t }) {
    const importDir = '../modules/';
    const exportDir = location.origin+'/ts-calculator/modules/calc/';
    console.log(exportDir);
    
  return {
    visitor: {
      Program(path) {
        const body = path.get("body");

        for (const stmt of body) {
          if (!stmt.isImportDeclaration()) continue;

          const node = stmt.node;
          const source = node.source.value;

          // 指定のパス（例: ../modules/）から始まるものだけ対象
          if (!source.startsWith(importDir)) continue;

          const dynamicPath = source.replace(importDir, exportDir);

          const properties = node.specifiers.map(spec => {
            if (t.isImportSpecifier(spec)) {
              return t.objectProperty(
                t.identifier(spec.imported.name),
                t.identifier(spec.local.name),
                false,
                spec.imported.name === spec.local.name
              );
            } else if (t.isImportDefaultSpecifier(spec)) {
              return t.objectProperty(
                t.identifier("default"),
                t.identifier(spec.local.name)
              );
            } else {
              throw new Error("Unsupported specifier type");
            }
          });

          const variableDecl = t.variableDeclaration("const", [
            t.variableDeclarator(
              t.objectPattern(properties),
              t.awaitExpression(t.callExpression(t.import(), [t.stringLiteral(dynamicPath)]))
            ),
          ]);

          stmt.replaceWith(variableDecl);
        }
      },
    },
  };
};
