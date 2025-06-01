import integral from '../modules/calc/integral.js'
import { legendre } from '../modules/calc/specialFunctions.js'
import { add, sub, mul, div, neg } from '../modules/calc/operators.js'

const N = 10;
const isAllDump = false;
const THRE = 1.0e-8;

for( let i=0; i<N; i++ ){
    for( let j=0; j<N; j++ ){
        const val = integral.simpson((x)=> legendre(i, x) * legendre(j, x), -1, 1);
        const correct_val = i === j ? 2/(2*i+1) : 0;

        if( isAllDump ){
            console.log(` L_${i} * L_${j} dx =`, val, ' Correct Val =', correct_val);
        }
        else{
            if( Math.abs(val - correct_val) < THRE ) continue;
            console.log(` L_${i} * L_${j} dx =`, val, ' Correct Val =', correct_val);
        }
    }
}

