// babel-plugin-transform-static-import-to-dynamic.js
module.exports = function ({ types: t }) {
  return {
    visitor: {
      Program(path) {
        const body = path.get("body");

        for (const stmt of body) {
          if (!stmt.isImportDeclaration()) continue;

          const importDecl = stmt.node;
          const source = importDecl.source.value;

          // import default or named imports
          const specifiers = importDecl.specifiers;

          // const { named } = await import('...');
          let declaration;
          if (specifiers.length === 1 && t.isImportDefaultSpecifier(specifiers[0])) {
            const localName = specifiers[0].local.name;
            declaration = t.variableDeclaration("const", [
              t.variableDeclarator(
                t.identifier(localName),
                t.awaitExpression(t.callExpression(t.import(), [t.stringLiteral(source.replace(/^\.\.\//, "/"))]))
              ),
            ]);
          } else if (specifiers.every(s => t.isImportSpecifier(s))) {
            const properties = specifiers.map(spec =>
              t.objectProperty(t.identifier(spec.imported.name), t.identifier(spec.local.name), false, spec.imported.name === spec.local.name)
            );

            declaration = t.variableDeclaration("const", [
              t.variableDeclarator(
                t.objectPattern(properties),
                t.awaitExpression(t.callExpression(t.import(), [t.stringLiteral(source.replace(/^\.\.\//, "/"))]))
              ),
            ]);
          } else {
            throw new Error(`Unsupported import kind in: ${source}`);
          }

          stmt.replaceWith(declaration);
        }
      },
    },
  };
};

