import { Complex } from '../Complex.js';
import { add, sub, mul, div } from '../operators.js';
export default function trapezoid(f: ((x: number) => number) | ((x: Complex) => Complex), x0: number | Complex, x1: number | Complex, N: number = 1000): number | Complex {
  if (typeof x0 === 'number') {
    const dx = div(sub(x1, x0), N);
    let sum0 = add((f as (x: number) => number)(x0), (f as (x: number) => number)(x1 as number));
    let sum1 = 0;
    let sum2 = 0;
    for (let i = 1; i < N; i += 2) sum1 = add(sum1, f(add(x0, mul(i, dx))));
    for (let i = 2; i < N; i += 2) sum2 = add(sum2, f(add(x0, mul(i, dx))));
    return mul(div(dx, 3), add(add(sum0, mul(4, sum1)), mul(2, sum2)));
  }
  if (x0 instanceof Complex) {
    const dx = div(sub(x1, x0), N);
    let sum0 = add((f as (x: Complex) => Complex)(x0), (f as (x: Complex) => Complex)(x1 as Complex));
    let sum1 = new Complex(0, 0);
    let sum2 = new Complex(0, 0);
    for (let i = 1; i < N; i += 2) sum1 = add(sum1, f(add(x0, mul(i, dx))));
    for (let i = 2; i < N; i += 2) sum2 = add(sum2, f(add(x0, mul(i, dx))));
    return mul(div(dx, 3), add(add(sum0, mul(4, sum1)), mul(2, sum2)));
  }
  throw new Error(`Invalid input  ${typeof x0}`);
}