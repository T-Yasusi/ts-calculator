import { Complex } from '../Complex.js';
import exp from './exp.js';
export default function sinh(x) {
    if (typeof x === 'number') {
        return Math.sinh(x);
    }
    if (x instanceof Complex) {
        return exp(x).sub(exp(x.neg())).div(2);
    }
    throw new Error('!!! sinh invalid type !!! ' + typeof x);
}
