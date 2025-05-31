type Negatable =
  | number
  | bigint
  | { neg: () => any };

function neg(value: Negatable): any {
  if (typeof value === 'undefined') {
    throw new Error('Invalid argument: undefined value');
  }

  if (typeof value === 'number') return -value;
  if (typeof value === 'bigint') return -value;

  if (typeof value === 'object' && value !== null && typeof value.neg === 'function') {
    return value.neg();
  }

  throw new Error(
    `Invalid operand type: ${typeof value} — only number, bigint, or object with .neg() method are allowed`
  );
}

export default function (...args: Negatable[]): any {
  if (args.length !== 1) {
    throw new Error(`neg() takes exactly one argument (got ${args.length})`);
  }

  return neg(args[0]);
}
