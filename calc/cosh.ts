import { Complex } from './Complex.js';
import exp from './exp.js';

type InputType = number | Complex;

export default function cosh(x: InputType): number | Complex {
    if (typeof x === 'number') {
        return Math.cosh(x);
    }

    if (x instanceof Complex) {
        return (exp(x) as Complex).add(exp(x.neg())).div(2);
    }

    throw new Error('!!! cosh invalid type !!! ' + typeof x);
}
