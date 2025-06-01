import { Complex } from '../Complex.js';

type InputType = number | Complex;

export default function isNaN(x: InputType): boolean {
    if (typeof x === 'number') {
        return Number.isNaN(x);
    }

    if (x instanceof Complex) {
        return (Number.isNaN(x.re) || Number.isNaN(x.im));
    }

    throw new Error('!!! isNaN invalid type !!! ' + typeof x);
}