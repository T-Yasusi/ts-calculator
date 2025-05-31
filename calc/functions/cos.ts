import { Complex } from '../Complex.js';
import exp from './exp.js';

type InputType = number | Complex;

export default function cos(x: InputType): number | Complex {
    if (typeof x === 'number') {
        return Math.cos(x);
    }

    if (x instanceof Complex) {
        const i = new Complex(0, 1);
        const minusI = new Complex(0, -1);

        const expIp = exp(x.mul(i)) as Complex;
        const expIn = exp(x.mul(minusI)) as Complex;

        return expIp.add(expIn).div(2);
    }

    throw new Error('!!! cos invalid type !!! ' + typeof x);
}
