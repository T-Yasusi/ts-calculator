import Matrix from '../Matrix.js';
import ComplexMatrix from '../ComplexMatrix.js';
import { add, sub, mul, div, neg } from '../operators.js';
import { createUnitMatrix, createUnitComplexMatrix } from './createUnitMatrix.js';
import { abs } from '../functions.js';
import searchPivot from './searchPivot.js';
import swapRow from './swapRow.js';
const THRESHOLD = 1.0e-8;
export default function gaussianElimination(mat: Matrix | ComplexMatrix): Matrix | ComplexMatrix {
  if (mat.cols !== mat.rows) throw new Error("!!! Gaussian Elimination  not Square Matrix !!!");
  const copied = mat instanceof Matrix ? new Matrix(...mat) : new ComplexMatrix(...mat);
  const result = mat instanceof Matrix ? createUnitMatrix(mat.cols) : createUnitComplexMatrix(mat.cols);

  //   console.log('a', copied.toPrecision(3));
  //    console.log('b', result.toPrecision(3));
  for (let i = 0; i < mat.cols; i++) {
    const pivot = searchPivot(mat, i);
    if (i !== pivot) {
      swapRow(copied, i, pivot);
      swapRow(result, i, pivot);
    }
    const a = copied[i][i];
    if (abs(a) < THRESHOLD) throw new Error('Gaussian Elimination Matrix is singular');
    for (let j = 0; j < mat.rows; j++) {
      copied[i][j] = div(copied[i][j], a);
      result[i][j] = div(result[i][j], a);
    }
    for (let j = add(i, 1); j < mat.cols; j++) {
      const b = div(copied[j][i], copied[i][i]);
      for (let k = 0; k < mat.cols; k++) {
        copied[j][k] = sub(copied[j][k], mul(b, copied[i][k]));
        result[j][k] = sub(result[j][k], mul(b, result[i][k]));
      }
    }
  }

  //    console.log('a', copied.toPrecision(3));
  //    console.log('b', result.toPrecision(3));

  for (let i = sub(mat.cols, 1); i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      const a = copied[j][i];
      for (let k = 0; k < mat.rows; k++) {
        copied[j][k] = sub(copied[j][k], mul(a, copied[i][k]));
        result[j][k] = sub(result[j][k], mul(a, result[i][k]));
      }
    }
  }
  return result;
}