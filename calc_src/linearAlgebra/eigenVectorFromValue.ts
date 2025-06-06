import { Complex, Vector, ComplexVector, Matrix, ComplexMatrix } from '../classes.js'
import { add, sub, mul, div, neg } from '../operators.js'
import { createUnitMatrix, createUnitComplexMatrix } from './createUnitMatrix.js'
import { abs } from '../functions.js'
import searchPivot from './searchPivot.js'
import swapRow from './swapRow.js'
import toReal from '../util/toReal.js'

const THRESHOLD = 1.0e-8;

export default function eigenVectorFromValue(val: number | Complex, mat: Matrix | ComplexMatrix) : Vector | ComplexVector {
    if( mat.cols !== mat.rows ) throw new Error("!!! eigneVectorFromValue not Square Matrix !!!");
    val = toReal(val);
//    console.log('val =', val, ' mat =\n', mat.toPrecision(3));

    const A = mat - val * createUnitMatrix(mat.cols);
    const result = typeof val === 'number' ? new Vector(mat.rows) : new ComplexVector(mat.rows);
//    console.log('A =\n', A.toPrecision(3));

    let skipRows = [];
    for( let i=0; i<mat.cols; i++ ){
        const pivot=searchPivot(mat, i);
        if( i !== pivot ){
            swapRow(A, i, pivot);
        }
        const a = A[i][i];
        if( abs(a) < THRESHOLD ){
            skipRows.push(i);
            continue;
        }
        for( let j=0; j<mat.rows; j++ ) A[i][j] = A[i][j]/a;

        for( let j=i+1; j<mat.cols; j++ ){
            const b = A[j][i] / A[i][i];
            for( let k=0; k<mat.cols; k++ ) A[j][k] = A[j][k] - b*A[i][k];
        }
    }    

//    console.log('Forward Elimiantion FINISH');
//    console.log('A = \n', A.toPrecision(3));

    for( let i=mat.cols-1; i>=0; i-- ){
        if( skipRows.includes(i) ) continue;
        for( let j=0; j<i; j++ ){
            const a=A[j][i];
            for( let k=0; k<mat.rows; k++ ){
                A[j][k] = A[j][k] - a*A[i][k];
            }
        }
    }
    console.log('Backward Elimination FINISH');
    console.log('A = \n', A.toPrecision(3));
    let zeroRow=0;
    for( let i=0; i<mat.cols; i++ ){
        if( abs(A[i][i])<THRESHOLD ){
            zeroRow=i;
            break;
        }
    }
    console.log(zeroRow);

    result[zeroRow]= result[0] instanceof Complex ? new Complex(1, 0) : 1;
    for( let i=0; i<zeroRow; i++ ) result[i]= -A[i][zeroRow];

//    console.log('val =', val, '  Result =', result.toPrecision(3));
//    console.log((mat*result).toPrecision(3));
//    console.log((val*result).toPrecision(3));

    return result.normalize();
}