import { Complex } from '../../Complex.js';
import trapezoid from '../trapezoid.js';
import { sub, mul, neg } from '../../operators.js';
import { abs, isNaN } from '../../functions.js';
export default function convergeComplex(g, threshold) {
    let max_range = 50;
    while (isNaN(abs(g(neg(max_range)))) || isNaN(abs(g(new Complex(max_range, 0))))) {
        max_range = mul(0.5, max_range);
        if (max_range < 1.0e-3)
            throw new Error('!!! integral.minusInfToInf not converged function !!!');
    }
    //    console.log('max_range :', max_range);
    let range = mul(0.1, max_range);
    const step = range;
    let val0 = trapezoid(g, neg(range), range);
    range += step;
    let val1 = trapezoid(g, neg(range), range);
    while (abs(sub(val0, val1)) > threshold) {
        range += step;
        if (range > max_range)
            throw new Error('!!! integral.minusInfToInf not converged !!!');
        val0 = val1;
        val1 = trapezoid(g, neg(range), range);
        //       console.log(range, val0, val1);
    }
    return val1;
}
