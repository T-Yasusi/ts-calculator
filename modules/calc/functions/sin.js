import { Complex } from '../Complex.js';
import exp from './exp.js';
export default function sin(x) {
    if (typeof x === 'number') {
        return Math.sin(x);
    }
    if (x instanceof Complex) {
        const i = new Complex(0, 1);
        const minusI = new Complex(0, -1);
        const expIp = exp(x.mul(i));
        const expIn = exp(x.mul(minusI));
        return expIp.sub(expIn).div(new Complex(0, 2));
    }
    throw new Error('!!! sin invalid type !!! ' + typeof x);
}
