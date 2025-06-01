import { Complex } from '../Complex.js';
import { add, sub, mul, div } from '../operators.js';
type InputType = number | Complex;
export default function hermite(n: number, x: InputType): number | Complex {
  if (!Number.isInteger(n) || n < 0) throw new Error(`Expected a positive integer, but got ${n}`);
  if (n === 0) return 1;else if (n === 1) return mul(2, x);else {
    let a0 = 1;
    let a1 = mul(2, x);
    let a2 = mul(2, sub(mul(x, a1), a0));
    for (let i = 2; i < n; i++) {
      a0 = a1;
      a1 = a2;
      a2 = mul(2, sub(mul(x, a1), a0));
    }
    return a2;
  }
  throw new Error(add('!!! sin invalid type !!! ', typeof x));
}