import { Complex } from '../Complex.js';

type InputType = number | Complex;

export default function abs(x: InputType): number | Complex {
    if (typeof x === 'number') {
        return Math.abs(x);
    }

    if (x instanceof Complex) {
        return x.abs();
    }

    throw new Error('!!! abs invalid type !!! ' + typeof x);
}