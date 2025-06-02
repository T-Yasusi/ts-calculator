import integral from '../modules/calc/integral.js'
import { normalizedAssociatedLegendre } from '../modules/calc/specialFunctions.js'
import { add, sub, mul, div, neg } from '../modules/calc/operators.js'

const maxL = 5;
const isAllDump = true;
const THRE = 1.0e-8;

for( let l=0; l<=maxL; l++ ){
    for( let k=0; k<=maxL; k++ ){
        const maxM=l>k ? k : l;
        for( let m=-maxM; m<=maxM; m++ ){
            const val=integral.simpson((x)=> 
                normalizedAssociatedLegendre(m, l, x)*normalizedAssociatedLegendre(m, k, x), -1, 1);
                const correct_val = l === k ? 1 : 0;
            
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
