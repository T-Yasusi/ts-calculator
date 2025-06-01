import { Complex } from '../../Complex.js';
import { add, sub, mul, div, neg } from '../../operators.js';
import { exp, sinh, cosh, tanh } from '../../functions.js';
import converge from './zeroToInf/converge.js';
import convergeComplex from './zeroToInf/convergeComplex.js';
export default function minusInfToInf(f: ((x: number) => number) | ((x: Complex) => Complex), threshold: number = 1.0e-8) {
  const isReal = typeof f === 'function' && f.length === 1 && typeof f(0 as any) === 'number';
  if (isReal) {
    const phi = (t: number): number => exp(mul(div(Math.PI, 2), sinh(t))) as number;
    const phiPrime = (t: number): number => mul(mul(div(Math.PI, 2), cosh(t)), phi(t)) as number;
    const g = (t: number): number => mul((f as (x: number) => number)(phi(t)), phiPrime(t));
    return converge(g, threshold);
  } else {
    const phi = (t: Complex): Complex => exp(mul(div(Math.PI, 2), sinh(t))) as Complex;
    const phiPrime = (t: Complex): Complex => mul(mul(div(Math.PI, 2), cosh(t)), phi(t)) as Complex;
    const g = (t: Complex): Complex => mul((f as (x: Complex) => Complex)(phi(t)), phiPrime(t));
    return convergeComplex(g, threshold);
  }
}