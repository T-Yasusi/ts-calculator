import { add, sub, mul, div } from './operators.js';
import { Complex } from './Complex.js';
import exp from './exp.js';

type InputType = number | Complex;

export default function sin(x: InputType): number | Complex {
    if (typeof x === 'number') {
        return Math.sin(x);
    }

    if (x instanceof Complex) {
        const i = new Complex(0, 1);
        const minusI = new Complex(0, -1);

        const expIp = exp(x.mul(i)) as Complex;
        const expIn = exp(x.mul(minusI)) as Complex;

	return expIp.sub(expIn).div(new Complex(0, 2));
    }

    throw new Error('!!! sin invalid type !!! ' + typeof x);
}