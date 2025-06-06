import { Matrix, ComplexMatrix, Complex, Vector, ComplexVector } from '../classes.js'

type Multipliable =
  | number
  | bigint
  | { mul: (other: any) => any };

function mul(a: Multipliable, b: Multipliable): any {
  if (typeof a === 'undefined' || typeof b === 'undefined') {
    throw new Error(`Invalid arguments: undefined value`);
  }

  if (typeof a === 'number' && typeof b === 'number') return a * b;
  if (typeof a === 'bigint' && typeof b === 'bigint') return a * b;

  if (typeof a === 'string' || typeof b === 'string') {
    throw new Error('Multiplication not supported for strings');
  }
  if( a instanceof Complex && ( b instanceof Matrix || b instanceof ComplexMatrix || b instanceof Vector || b instanceof ComplexVector ) ){
    return b.mul(a);
  }
  if (typeof a === 'object' && a !== null && typeof a.mul === 'function') {
    return a.mul(b);
  }

  if (typeof b === 'object' && b !== null && typeof b.mul === 'function') {
    return b.mul(a);
  }

  throw new Error(
    `Invalid operand types: ${typeof a} * ${typeof b} — only (number*number), (bigint*bigint), or .mul() are allowed`
  );
}

export default function (...args: Multipliable[]): any {
  if (args.length === 0) throw new Error('No arguments provided');
  if (args.length === 1) return args[0];

  return args.slice(1).reduce((prod, val) => mul(prod, val), args[0]);
}
