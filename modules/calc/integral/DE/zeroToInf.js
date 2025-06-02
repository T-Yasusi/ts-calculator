import { mul, div } from '../../operators.js';
import { exp, sinh, cosh } from '../../functions.js';
import converge from './zeroToInf/converge.js';
import convergeComplex from './zeroToInf/convergeComplex.js';
export default function minusInfToInf(f, threshold = 1.0e-8) {
    const isReal = typeof f === 'function' && f.length === 1 && typeof f(0) === 'number';
    if (isReal) {
        const phi = (t) => exp(mul(div(Math.PI, 2), sinh(t)));
        const phiPrime = (t) => mul(mul(div(Math.PI, 2), cosh(t)), phi(t));
        const g = (t) => mul(f(phi(t)), phiPrime(t));
        return converge(g, threshold);
    }
    else {
        const phi = (t) => exp(mul(div(Math.PI, 2), sinh(t)));
        const phiPrime = (t) => mul(mul(div(Math.PI, 2), cosh(t)), phi(t));
        const g = (t) => mul(f(phi(t)), phiPrime(t));
        return convergeComplex(g, threshold);
    }
}
