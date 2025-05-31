import { Complex } from '../Complex.js';
import exp from './exp.js';
export default function cos(x) {
    if (typeof x === 'number') {
        return Math.cos(x);
    }
    if (x instanceof Complex) {
        const i = new Complex(0, 1);
        const minusI = new Complex(0, -1);
        const expIp = exp(x.mul(i));
        const expIn = exp(x.mul(minusI));
        return expIp.add(expIn).div(2);
    }
    throw new Error('!!! cos invalid type !!! ' + typeof x);
}
