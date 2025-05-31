import { Complex } from '../Complex.js';
import { add, sub, mul, div } from '../operators.js';

export default function central(
  f: ((x: number) => number) | ((x: Complex) => Complex),
  x0: number | Complex,
  dx?: number | Complex
): number | Complex {
  if (typeof x0 === 'number') {
    const delta = typeof dx === 'number' ? dx : 1.0e-8;
    return ((f as (x: number) => number)(x0 + delta) - (f as (x: number) => number)(x0 - delta)) / (2 * delta);
  }

  if (x0 instanceof Complex) {
    const delta = dx instanceof Complex ? dx : new Complex(1.0e-8, 0);
    return ((f as (x: Complex) => Complex)(x0 + delta) - (f as (x: Complex) => Complex)(x0 - delta)) / (2 * delta);
  }

  throw new Error('Invalid input');
};