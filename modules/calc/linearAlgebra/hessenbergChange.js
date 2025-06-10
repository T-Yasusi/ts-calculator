import { Complex } from '../Complex.js';
import Matrix from '../Matrix.js';
import ComplexMatrix from '../ComplexMatrix.js';
import { add, sub, mul } from '../operators.js';
import { createUnitMatrix, createUnitComplexMatrix } from './createUnitMatrix.js';
import { exp } from '../functions.js';
export default function hessenbergChange(mat) {
    if (mat.cols !== mat.rows)
        throw new Error("!!! Householder QR decomposition  not Square Matrix !!!");
    if (mat instanceof Matrix) {
        let A = new Matrix(...mat);
        for (let i = 0; i < sub(mat.cols, 1); i++) {
            let v = A.colVector(i);
            for (let j = 0; j <= i; j++)
                v[j] = 0;
            if (v.norm() === 0)
                continue;
            v[add(i, 1)] = v[add(i, 1)] >= 0 ? add(v[add(i, 1)], v.norm()) : sub(v[add(i, 1)], v.norm());
            v = v.normalize();
            const H = createUnitMatrix(A.cols);
            for (let j = add(i, 1); j < A.cols; j++) {
                for (let k = add(i, 1); k < A.cols; k++)
                    H[j][k] = sub(H[j][k], mul(mul(2, v[j]), v[k]));
            }
            A = mul(mul(H, A), H.transpose());
        }
        return A;
    }
    if (mat instanceof ComplexMatrix) {
        let A = new ComplexMatrix(...mat);
        for (let i = 0; i < sub(mat.cols, 1); i++) {
            let v = A.colVector(i);
            for (let j = 0; j <= i; j++)
                v[j] = new Complex(0, 0);
            if (v.norm() === 0)
                continue;
            v[add(i, 1)] = add(v[add(i, 1)], mul(exp(mul(new Complex(0, 1), v[add(i, 1)].arg())), v.norm()));
            v = v.normalize();
            const H = createUnitComplexMatrix(A.cols);
            for (let j = add(i, 1); j < A.cols; j++) {
                for (let k = add(i, 1); k < A.cols; k++)
                    H[j][k] = sub(H[j][k], mul(mul(2, v[j]), v[k].conj()));
            }
            A = mul(mul(H, A), H.conj());
        }
        return A;
    }
    throw new Error('!!! hessenbergChange Invaild type !!!');
}
