import { Complex } from '../Complex.js';
import exp from './exp.js';
export default function cosh(x) {
    if (typeof x === 'number') {
        return Math.cosh(x);
    }
    if (x instanceof Complex) {
        return exp(x).add(exp(x.neg())).div(2);
    }
    throw new Error('!!! cosh invalid type !!! ' + typeof x);
}
