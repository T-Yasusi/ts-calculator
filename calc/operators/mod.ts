type Modable =
  | number
  | bigint
  | { mod: (other: any) => any };

function mod(a: Modable, b: Modable): any {
  if (typeof a === 'undefined' || typeof b === 'undefined') {
    throw new Error(`Invalid arguments: undefined value`);
  }

  if (typeof b === 'number' && b === 0) {
    throw new Error('Modulo by zero');
  }

  if (typeof b === 'bigint' && b === 0n) {
    throw new Error('Modulo by zero');
  }

  if (typeof a === 'number' && typeof b === 'number') return a % b;
  if (typeof a === 'bigint' && typeof b === 'bigint') return a % b;

  if (typeof a === 'string' || typeof b === 'string') {
    throw new Error('Modulo not supported for strings');
  }

  if (typeof a === 'object' && a !== null && typeof a.mod === 'function') {
    return a.mod(b);
  }

  // 非可換のため b.mod(a) は許可しない
  throw new Error(
    `Invalid operand types: ${typeof a} % ${typeof b} — only (number%number), (bigint%bigint), or .mod() (from first operand only) are allowed`
  );
}

export default function (...args: Modable[]): any {
  if (args.length === 0) throw new Error('No arguments provided');
  if (args.length === 1) return args[0];

  return args.slice(1).reduce((remainder, val) => mod(remainder, val), args[0]);
}
