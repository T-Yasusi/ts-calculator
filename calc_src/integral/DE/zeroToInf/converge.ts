import trapezoid from '../../trapezoid.js'
import { add, sub, mul, div, neg } from '../../../operators.js';
import { abs } from '../../../functions.js'

export default function converge(
    g: ((x: number)=> number),
    threshold: number
): number {
    let max_range = 20;
    while( Number.isNaN(abs(g(-max_range))) || Number.isNaN(abs(g(max_range))) ){
        max_range = 0.5*max_range;
        if( max_range<1.0e-3 ) throw new Error('!!! integral.minusInfToInf not converged function !!!');
    }
 //   console.log('max_range :', max_range);

    let range = 0.1*max_range;
    const step = range;
    let val0 = trapezoid(g, -range, range);
    range += step;
    let val1 = trapezoid(g, -range, range);
    while( abs(val0-val1) as number > threshold ){
        range += step;
        if( Number.isNaN(g(-range)) || Number.isNaN(g(range)) ) throw new Error('!!! integral.minusInfToInf not converged !!!');
        val0 = val1;
        val1 = trapezoid(g, -range, range);
 //       console.log(range, val0, val1);
    }
    return val1 as number;
}