import { Complex } from '../Complex.js';

type InputType = number | Complex;

export default function exp(x: InputType): number | Complex {
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