import { Complex } from '../Complex.js';
export default function log(x) {
    if (typeof x === 'number') {
        return Math.log(x);
    }
    if (x instanceof Complex) {
        return new Complex(Math.log(x.abs()), x.arg());
    }
    throw new Error('!!! log invalid type !!! ' + typeof x);
}
