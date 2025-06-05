import { Matrix, ComplexMatrix, Complex } from '../classes.js'
import { add, sub, mul, div, neg } from '../operators.js'
import { createUnitMatrix, createUnitComplexMatrix } from './createUnitMatrix.js'
import { abs } from '../functions.js'
import trace from './trace.js'

export default function frame(mat: Matrix | ComplexMatrix): number[] | Complex[] {
    if( mat.cols!==mat.rows ) 
        throw new Error('!!! linearAlgebra.tr Matrix should be Square !!! '+mat.cols+' '+mat.rows);
    const E = mat instanceof Matrix ? createUnitMatrix(mat.cols) : createUnitComplexMatrix(mat.cols);

    const coffs = [];

    let A = mat instanceof Matrix ? new Matrix(...mat) : new ComplexMatrix(...mat);
    let p = trace(A);
    let B = A - p*E
    coffs.push(p);
    let n=1;
    while( coffs.length<mat.cols ){
        n++;
        A = mat*B;
        p = trace(A)/n;
        B = A - p*E;
        coffs.push(p);
    }
    coffs.unshift(-1);

    return coffs;
}