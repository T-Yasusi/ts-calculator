import { Complex } from '../Complex.js';
import sinh from './sinh.js';
import cosh from './cosh.js';
export default function tanh(x) {
    if (typeof x === 'number') {
        return Math.tanh(x);
    }
    if (x instanceof Complex) {
        return sinh(x).div(cosh(x));
    }
    throw new Error('!!! tanh invalid type !!! ' + typeof x);
}
