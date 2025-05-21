const operatorToFunction = {
  '+': 'add',
  '-': 'sub',
  '*': 'mul',
  '/': 'div',
  '%': 'mod',
};

const unaryOperatorToFunction = {
  '-': 'neg',
};

export default function operatorOverloadPlugin({ types: t }) {
  console.log("✅ operator_overload plugin loaded");
  return {
    visitor: {
      BinaryExpression(path) {
        const { operator, left, right } = path.node;
        const fname = operatorToFunction[operator];
        if (!fname) return;

        path.replaceWith(
          t.callExpression(t.identifier(fname), [left, right])
        );
      },
	
      UnaryExpression(path) {
        const { operator, argument } = path.node;
        const fname = unaryOperatorToFunction[operator];
        if (!fname) return;

        path.replaceWith(
          t.callExpression(t.identifier(fname), [argument])
        );
      }
    },
  };
};
