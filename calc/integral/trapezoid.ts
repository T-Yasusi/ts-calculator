import { Complex } from '../Complex.js';
import { add, sub, mul, div } from '../operators.js';
export default function trapezoid(f: ((x: number) => number) | ((x: Complex) => Complex), x0: number | Complex, x1: number | Complex, N: number = 1000): number | Complex {
  if (typeof x0 === 'number') {
    const dx = div(sub(x1, x0), N);
    let val = 0;
    for (let i = 0; i < N; i++) val = add(add(val, f(add(x0, mul(i, dx)))), f(add(x0, mul(add(i, 1), dx))));
    return mul(mul(0.5, dx), val);
  }
  if (x0 instanceof Complex) {
    const dx = div(sub(x1, x0), N);
    let val = new Complex(0, 0);
    for (let i = 0; i < N; i++) val = add(add(val, f(add(x0, mul(i, dx)))), f(add(x0, mul(add(i, 1), dx))));
    return mul(mul(0.5, dx), val);
  }
  throw new Error('Invalid input');
}