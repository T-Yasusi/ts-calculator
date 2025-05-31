import { Complex } from './Complex.js';

type InputType = number | Complex;

export default function log(x: InputType): number | Complex {
    if (typeof x === 'number') {
        return Math.log(x);
    }

    if (x instanceof Complex) {
        return new Complex(Math.log(x.abs()), x.arg());
    }

    throw new Error('!!! log invalid type !!! ' + typeof x);
}