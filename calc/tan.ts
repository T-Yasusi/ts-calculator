import { Complex } from './Complex.js';
import sin from './sin.js';
import cos from './cos.js';

type InputType = number | Complex;

export default function tan(x: InputType): number | Complex {
    if (typeof x === 'number') {
        return Math.tan(x);
    }

    if (x instanceof Complex) {
        return (sin(x) as Complex).div(cos(x) as Complex);
    }

    throw new Error('!!! tan invalid type !!! ' + typeof x);
}
