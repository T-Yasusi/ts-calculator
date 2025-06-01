import { Complex } from '../../Complex.js';
import { add, sub, mul, div, neg } from '../../operators.js';
import { sinh, cosh, tanh } from '../../functions.js';
import converge from './minusOneToOne/converge.js';
import convergeComplex from './minusOneToOne/convergeComplex.js';
export default function minusOneToOne(f: ((x: number) => number) | ((x: Complex) => Complex), threshold: number = 1.0e-3) {
  const isReal = typeof f === 'function' && f.length === 1 && typeof f(0 as any) === 'number';
  if (isReal) {
    const phi = (t: number): number => tanh(mul(div(Math.PI, 2), sinh(t))) as number;
    const phiPrime = (t: number): number => mul(mul(div(Math.PI, 2), cosh(t)), div(1, cosh(mul(div(Math.PI, 2), sinh(t)))) ** 2) as number;
    const g = (t: number): number => mul((f as (x: number) => number)(phi(t)), phiPrime(t));
    return converge(g, threshold);
  } else {
    const phi = (t: Complex): Complex => tanh(mul(div(Math.PI, 2), sinh(t))) as Complex;
    const phiPrime = (t: Complex): Complex => mul(mul(div(Math.PI, 2), cosh(t)), div(1, cosh(mul(div(Math.PI, 2), sinh(t)))) ** 2) as Complex;
    const g = (t: Complex): Complex => mul((f as (x: Complex) => Complex)(phi(t)), phiPrime(t));
    return convergeComplex(g, threshold);
  }
}