import { Complex } from '../Complex.js';
export default function exp(x) {
    if (typeof x === 'number') {
        return Math.exp(x);
    }
    if (x instanceof Complex) {
        const r = Math.exp(x.re);
        const theta = x.im;
        return new Complex(r * Math.cos(theta), r * Math.sin(theta));
    }
    throw new Error('!!! exp invalid type !!! ' + typeof x);
}
