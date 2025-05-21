type Divisible =
  | number
  | bigint
  | { div: (other: any) => any };

function div(a: Divisible, b: Divisible): any {
  if (typeof a === 'undefined' || typeof b === 'undefined') {
    throw new Error(`Invalid arguments: undefined value`);
  }

  if (typeof b === 'number' && b === 0) {
    throw new Error('Division by zero');
  }

  if (typeof b === 'bigint' && b === 0n) {
    throw new Error('Division by zero');
  }

  if (typeof a === 'number' && typeof b === 'number') return a / b;
  if (typeof a === 'bigint' && typeof b === 'bigint') {
    if (a % b !== 0n) {
      throw new Error('BigInt division must be exact');
    }
    return a / b;
  }

  if (typeof a === 'string' || typeof b === 'string') {
    throw new Error('Division not supported for strings');
  }

  if (typeof a === 'object' && a !== null && typeof a.div === 'function') {
    return a.div(b);
  }

  // 非可換のため b.div(a) は許可しない
  throw new Error(
    `Invalid operand types: ${typeof a} / ${typeof b} — only (number/number), (bigint/bigint), or .div() (from first operand only) are allowed`
  );
}

export default function (...args: Divisible[]): any {
  if (args.length === 0) throw new Error('No arguments provided');
  if (args.length === 1) return args[0];

  return args.slice(1).reduce((quotient, val) => div(quotient, val), args[0]);
}