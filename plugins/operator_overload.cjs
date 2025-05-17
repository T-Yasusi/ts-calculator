module.exports = function operatorOverloadPlugin({ types: t }) {
  return {
    visitor: {
      Statement(parentPath) {
        parentPath.traverse({
          BinaryExpression(path) {
            const { left, right, operator } = path.node;
            let fname;
            if (operator === '+') fname = t.identifier('add');
            else if (operator === '-') fname = t.identifier('sub');
            else if (operator === '*') fname = t.identifier('mul');
            else if (operator === '/') fname = t.identifier('div');
            else return;

            path.replaceWith(t.callExpression(fname, [left, right]));
          },
        });
      },
    },
  };
};
