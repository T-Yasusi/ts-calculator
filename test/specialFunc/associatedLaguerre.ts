import integral from '../modules/calc/integral.js'
import { associatedLaguerre } from '../modules/calc/specialFunctions.js'
import { add, sub, mul, div, neg } from '../modules/calc/operators.js'
import { exp, pow } from '../modules/calc/functions.js'

const maxL = 5;
const isAllDump = true;
const THRE = 1.0e-8;

for( let l=0; l<=maxL; l++ ){
    for( let k=0; k<=maxL; k++ ){
        const maxM=l>k ? k : l;
        for( let m=0; m<=maxM; m++ ){
            const val=integral.zeroToInf((x)=> 
                associatedLaguerre(m, l, x)*associatedLaguerre(m, k, x)*exp(-x)*pow(x, m));
            const correct_val= orthogonalVal(m, l, k);

            if( isAllDump ){
                console.log(` L^${m}_${l} * L^${m}_${k} dx =`, val, ' Correct Val =', correct_val);
            }
            else{
                if( Math.abs(val - correct_val) < THRE ) continue;
                console.log(` L^${m}_${l} * L^${m}_${k} dx =`, val, ' Correct Val =', correct_val);
            }
        }
    }
}


function orthogonalVal(m: number, l: number, k: number): number {
    if( l!==k ) return 0;

    let val=1.0;
    for( let i=m+l; i>k; i-- ) val*=i;
    return val;
}