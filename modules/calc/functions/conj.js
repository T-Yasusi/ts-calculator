import { Complex } from '../Complex.js';
export default function conj(x) {
    if (typeof x === 'number') {
        return x;
    }
    if (x instanceof Complex) {
        return x.conj();
    }
    throw new Error('!!! abs invalid type !!! ' + typeof x);
}
