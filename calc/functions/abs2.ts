import { Complex } from '../Complex.js';

type InputType = number | Complex;

export default function abs(x: InputType): number {
    if (typeof x === 'number') {
        return x*x;
    }

    if (x instanceof Complex) {
        return x.abs2();
    }

    throw new Error('!!! abs invalid type !!! ' + typeof x);
}