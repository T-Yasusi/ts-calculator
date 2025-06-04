import { Complex } from '../Complex.js';

type InputType = number | Complex;

export default function conj(x: InputType): number | Complex {
    if (typeof x === 'number'){
        return x;
    }

    if (x instanceof Complex) {
        return x.conj();
    }

    throw new Error('!!! abs invalid type !!! ' + typeof x);
}