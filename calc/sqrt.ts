import { Complex } from './Complex.js';
import pow from './pow.js';
import sin from './sin.js';
import cos from './cos.js';

type Input = number | Complex;

export default function sqrt(x: Input): number | Complex {
    if (typeof x === 'number') {
        if (x < 0) return new Complex(0, Math.sqrt(-x));
        return Math.sqrt(x);
    }

    if (x instanceof Complex) {
        const r = pow(x.abs()**2, 0.25) as number;
        const theta = x.arg();
        return new Complex(r * Math.sin(theta), r * Math.cos(theta));
    }

    throw new Error('!!! sqrt invalid type !!! ' + typeof x);
}
