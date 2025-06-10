import integral from '../modules/calc/integral.js'
import { associatedLegendre } from '../modules/calc/specialFunctions.js'
import { add, sub, mul, div, neg } from '../modules/calc/operators.js'

const maxL = 5;
const isAllDump = true;
const THRE = 1.0e-8;

for( let l=0; l<=maxL; l++ ){
    for( let k=0; k<=maxL; k++ ){
        const maxM=l>k ? k : l;
        for( let m=-maxM; m<=maxM; m++ ){
            const val=integral.simpson((x)=> associatedLegendre(m, l, x)*associatedLegendre(m, k, x), -1, 1);
            const correct_val = orthogonalVal(m, l, k);

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

function orthogonalVal(m: number, l: number, k:number): number {
    if( l!==k ) return 0;

    let val=2/(2*l+1);
    for( let i=1; i<=l+m; i++ ) val*=i;
    for( let i=1; i<=l-m; i++ ) val/=i;

    return val;
}