import integral from '../modules/calc/integral.js'
import { hermite } from '../modules/calc/specialFunctions.js'
import { add, sub, mul, div, neg } from '../modules/calc/operators.js'
import { exp, factorial, pow, sqrt } from '../modules/calc/functions.js'

const N = 10;
const isAllDump = false;
const THRE = 1.0e-8;

for( let i=0; i<N; i++ ){
    for( let j=0; j<N; j++ ){
        const val = integral.minusInfToInf(x=> hermite(i, x) * hermite(j, x) * exp(-x*x), 1.0e-5);
        const correct_val=i===j ? sqrt(Math.PI)*pow(2, i)*factorial(i) : 0;

        if( isAllDump ){
            console.log(` H_${i} * H_${j} dx =`, val, ' Correct Val =', correct_val);
        }
        else{
            if( Math.abs(val - correct_val) < THRE ) continue;
            console.log(` H_${i} * H_${j} dx =`, val, ' Correct Val =', correct_val);
        }
    }
}