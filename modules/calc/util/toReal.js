import { Complex } from '../classes.js';
import { abs } from '../functions.js';
export default function toReal(a, threshold = 1.0e-8) {
    if (typeof a === 'number')
        return a;
    if (a instanceof Complex) {
        if (abs(a.im) < threshold)
            return a.re;
        else
            return a;
    }
    throw new Error('!!! toReal Invaild type !!!');
}
