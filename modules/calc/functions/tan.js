import { Complex } from '../Complex.js';
import sin from './sin.js';
import cos from './cos.js';
export default function tan(x) {
    if (typeof x === 'number') {
        return Math.tan(x);
    }
    if (x instanceof Complex) {
        return sin(x).div(cos(x));
    }
    throw new Error('!!! tan invalid type !!! ' + typeof x);
}
