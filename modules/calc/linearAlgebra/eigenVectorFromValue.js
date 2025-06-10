import { Complex, Vector, ComplexVector } from '../classes.js';
import { add, sub, mul, div, neg } from '../operators.js';
import { createUnitMatrix } from './createUnitMatrix.js';
import { abs } from '../functions.js';
import searchPivot from './searchPivot.js';
import swapRow from './swapRow.js';
const THRESHOLD = 1.0e-8;
export default function eigenVectorFromValue(val, mat) {
    if (mat.cols !== mat.rows)
        throw new Error("!!! eigneVectorFromValue not Square Matrix !!!");
    const A = sub(mat, mul(val, createUnitMatrix(mat.cols)));
    const result = typeof val === 'number' ? new Vector(mat.rows) : new ComplexVector(mat.rows);
    let skipRows = [];
    for (let i = 0; i < mat.cols; i++) {
        const pivot = searchPivot(mat, i);
        if (i !== pivot) {
            swapRow(A, i, pivot);
        }
        const a = A[i][i];
        if (abs(a) < THRESHOLD) {
            skipRows.push(i);
            continue;
        }
        for (let j = 0; j < mat.rows; j++)
            A[i][j] = div(A[i][j], a);
        for (let j = add(i, 1); j < mat.cols; j++) {
            const b = div(A[j][i], A[i][i]);
            for (let k = 0; k < mat.cols; k++)
                A[j][k] = sub(A[j][k], mul(b, A[i][k]));
        }
    }
    for (let i = sub(mat.cols, 1); i >= 0; i--) {
        if (skipRows.includes(i))
            continue;
        for (let j = 0; j < i; j++) {
            const a = A[j][i];
            for (let k = 0; k < mat.rows; k++) {
                A[j][k] = sub(A[j][k], mul(a, A[i][k]));
            }
        }
    }
    let zeroRow = 0;
    for (let i = 0; i < mat.cols; i++) {
        if (abs(A[i][i]) < THRESHOLD) {
            zeroRow = i;
            break;
        }
    }
    result[zeroRow] = result[0] instanceof Complex ? new Complex(1, 0) : 1;
    for (let i = 0; i < zeroRow; i++)
        result[i] = neg(A[i][zeroRow]);
    if (sub(mul(mat, result), mul(val, result)).norm() > THRESHOLD)
        throw new Error('eigenVector from Value can not calculated');
    return result.normalize();
}
