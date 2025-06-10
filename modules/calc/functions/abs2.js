import { Complex } from '../Complex.js';
export default function abs(x) {
    if (typeof x === 'number') {
        return x * x;
    }
    if (x instanceof Complex) {
        return x.abs2();
    }
    throw new Error('!!! abs invalid type !!! ' + typeof x);
}
