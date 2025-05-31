import { Complex } from './Complex.js';
import exp from './exp.js';

type InputType = number | Complex;

export default function sinh(x: InputType): number | Complex {
    if (typeof x === 'number') {
        return Math.sinh(x);
    }

    if (x instanceof Complex) {
        return (exp(x) as Complex).sub(exp(x.neg())).div(2);
    }

    throw new Error('!!! sinh invalid type !!! ' + typeof x);
}
