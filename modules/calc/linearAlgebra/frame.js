import { Matrix, ComplexMatrix } from '../classes.js';
import { add, sub, mul, div, neg } from '../operators.js';
import { createUnitMatrix, createUnitComplexMatrix } from './createUnitMatrix.js';
import trace from './trace.js';
export default function frame(mat) {
    if (mat.cols !== mat.rows)
        throw new Error(add(add(add('!!! linearAlgebra.tr Matrix should be Square !!! ', mat.cols), ' '), mat.rows));
    const E = mat instanceof Matrix ? createUnitMatrix(mat.cols) : createUnitComplexMatrix(mat.cols);
    const coffs = [];
    let A = mat instanceof Matrix ? new Matrix(...mat) : new ComplexMatrix(...mat);
    let p = trace(A);
    let B = sub(A, mul(p, E));
    coffs.push(p);
    let n = 1;
    while (coffs.length < mat.cols) {
        n++;
        A = mul(mat, B);
        p = div(trace(A), n);
        B = sub(A, mul(p, E));
        coffs.push(p);
    }
    coffs.unshift(neg(1));
    return coffs;
}
