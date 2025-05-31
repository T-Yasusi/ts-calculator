import integral from '../modules/calc/integral.js'
import { add, sub, mul, div, neg } from '../modules/calc/operators.js'
import { sin, cos, exp, log } from '../modules/calc/functions.js'

const func = x => cos(x);
const primitiveFunc = x=> sin(x);

check(func, primitiveFunc);

console.log('Trapezoid   Simpson   Correct');
function check(f, pf, max=Math.PI, N=10){
    const dx=max/N;
    for( let x=0; x<max; x+=dx ){
        console.log(integral.trapezoid(f, 0, x), '\t', integral.simpson(f, 0, x), '\t', pf(x));
    }
}
