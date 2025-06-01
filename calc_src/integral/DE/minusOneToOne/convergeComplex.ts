import { Complex } from '../../../Complex.js'
import trapezoid from '../../trapezoid.js'
import { add, sub, mul, div, neg } from '../../../operators.js';
import { abs, isNaN } from '../../../functions.js'

export default function convergeComplex(
    g: ((x: Complex)=> Complex),
    threshold: number
): Complex {
    let max_range = 1;
    try{
        while( !Number.isNaN(abs(g(-max_range))) || !Number.isNaN(abs(g(new Complex(max_range, 0)))) ){
            max_range = 1.2*max_range;
            if( max_range<1.0e-3 ) throw new Error('!!! integral.minusInfToInf not converged function !!!');
        }
    } catch(e){ 
        max_range = max_range/1.2;
    }
//    console.log('max_range :', max_range);

    let range = 0.1*max_range;
    const step = range;
    let val0 = trapezoid(g, -range, range);
    range += step;
    let val1 = trapezoid(g, -range, range);
    while( abs(val0-val1) as number > threshold ){
        range += step;
        if( range > max_range ) throw new Error('!!! integral.minusInfToInf not converged !!!');
        val0 = val1;
        val1 = trapezoid(g, -range, range);
 //       console.log(range, val0, val1);
    }
    return val1 as Complex;
}