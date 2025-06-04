import { Complex } from '../Complex.js';
import Matrix from '../Matrix.js';
import ComplexMatrix from '../ComplexMatrix.js';
import { add, sub, mul, div, neg } from '../operators.js';
import { createUnitMatrix, createUnitComplexMatrix } from './createUnitMatrix.js';
import { abs, exp } from '../functions.js';
import searchPivot from './searchPivot.js';
import swapRow from './swapRow.js';
export default function householderQR(mat: Matrix | ComplexMatrix): {
  Q: Matrix | ComplexMatrix;
  R: Matrix | ComplexMatrix;
} {
  if (mat.cols !== mat.rows) throw new Error("!!! Gaussian Elimination  not Square Matrix !!!");
  console.log('Input =\n', mat.toPrecision(3));
  let R = mat instanceof Matrix ? new Matrix(...mat) : new ComplexMatrix(...mat);
  let Q = mat instanceof Matrix ? createUnitMatrix(mat.cols) : createUnitComplexMatrix(mat.cols);
  for (let i = 0; i < sub(mat.cols, 1); i++) {
    console.log('===== i =', i, ' START ====');
    let v = R.colVector(i);
    for (let j = 0; j < i; j++) v[j] = mat instanceof Matrix ? 0 : new Complex(0, 0);
    console.log('v =', v.toPrecision(4), v.norm());
    if (v.norm() === 0) continue;
    if (mat instanceof Matrix) v[i] = v[i] as number >= 0 ? add(v[i], v.norm()) : sub(v[i], v.norm());else {
      console.log((v[i] as Complex).arg());
      v[i] = add(v[i], mul(exp(mul(new Complex(0, i), (v[i] as Complex).arg())), v.norm()));
    }
    console.log('u =', v.toPrecision(4));
    v = v.normalize();
    console.log('u normalized =', v, v.norm());
    let H = mul(neg(2), v.outerProduct(v));
    for (let i = 0; i < mat.cols; i++) H[i][i] = add(H[i][i], 1);
    if (mat instanceof ComplexMatrix) H = H.conj();
    console.log('H =\n', H.toPrecision(4));
    R = mul(H.conj(), R);
    Q = mul(Q, H);
    console.log('check =\n', mul(Q, R).toPrecision(4));
    console.log('Q =\n', Q.toPrecision(4));
    console.log('R =\n', R.toPrecision(4));
    /*         for( let j=i; j<mat.cols; j++){
                let dot = 0;
                for( let k=j; k<mat.cols; k++ ) dot = dot + v[k-i]*R[k][j];
                for( let k=j; k<mat.cols; k++ ) R[k][j] = R[k][j] - 2*v[k-i]*dot;
            }
            for( let j=i; j<mat.cols; j++){
                let dot = 0;
                for( let k=j; k<mat.cols; k++ ) dot = dot + v[k-i]*Q[k][j];
                for( let k=j; k<mat.cols; k++ ) Q[k][j] = Q[k][j] - 2*v[k-i]*dot;
            } 
                */
  }
  console.log('====== FINISH =======');
  if (mat instanceof Matrix) console.log('Q^T*Q =\n', mul(Q.transpose(), Q).toPrecision(3));else console.log('Q^T*Q =\n', mul((Q as ComplexMatrix).conj(), Q).toPrecision(3));
  console.log('Input =\n', mat.toPrecision(3));
  console.log('Q*R =\n', mul(Q, R).toPrecision(3));
  return {
    Q,
    R
  };
}