import { Complex } from '../Complex.js';
import sinh from './sinh.js';
import cosh from './cosh.js';

type InputType = number | Complex;

export default function tanh(x: InputType): number | Complex {
    if (typeof x === 'number') {
        return Math.tanh(x);
    }

    if (x instanceof Complex) {
        return (sinh(x) as Complex).div(cosh(x) as Complex);
    }

    throw new Error('!!! tanh invalid type !!! ' + typeof x);
}
