import { Complex } from '../Complex.js';
import Matrix from '../Matrix.js';
import ComplexMatrix from '../ComplexMatrix.js';
import { abs, exp } from '../functions.js';
import searchPivot from './searchPivot.js';
import swapRow from './swapRow.js';
import { createUnitMatrix } from './createUnitMatrix.js';
import { add, sub, mul, div } from '../operators.js';
export default function doolittleLU(mat: Matrix | ComplexMatrix): {
  L: Matrix | ComplexMatrix;
  U: Matrix | ComplexMatrix;
  P: Matrix;
} {
  if (mat.cols !== mat.rows) throw new Error("!!! Doolittle LU decomposition  not Square Matrix !!!");
  const A = mat instanceof Matrix ? new Matrix(...mat) : new ComplexMatrix(...mat);
  const L = mat instanceof Matrix ? new Matrix(mat.cols, mat.rows) : new ComplexMatrix(mat.cols, mat.rows);
  const U = mat instanceof Matrix ? new Matrix(mat.cols, mat.rows) : new ComplexMatrix(mat.cols, mat.rows);
  const P = createUnitMatrix(mat.cols);
  for (let i = 0; i < mat.cols; i++) {
    const pivot = searchPivot(A, i);
    if (pivot !== i) {
      swapRow(A, i, pivot);
      swapRow(U, i, pivot);
      swapRow(L, i, pivot);
      swapRow(P, i, pivot);
    }
    for (let j = i; j < A.cols; j++) {
      let sum = 0;
      for (let k = 0; k < j; k++) {
        sum = add(sum, mul(L[j][k], U[k][i]));
      }
      L[j][i] = sub(A[j][i], sum);
    }
    U[i][i] = 1;
    for (let j = add(i, 1); j < A.cols; j++) {
      let sum = 0;
      for (let k = 0; k < j; k++) {
        sum = add(sum, mul(L[i][k], U[k][j]));
      }
      U[i][j] = div(sub(A[i][j], sum), L[i][i]);
    }
  }
  return {
    L,
    U,
    P
  };
}