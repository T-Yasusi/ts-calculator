import { Complex } from '../Complex.js';
import pow from './pow.js';
export default function sqrt(x) {
    if (typeof x === 'number') {
        if (x < 0)
            return new Complex(0, Math.sqrt(-x));
        return Math.sqrt(x);
    }
    if (x instanceof Complex) {
        return pow(x, 0.5);
    }
    throw new Error('!!! sqrt invalid type !!! ' + typeof x);
}
