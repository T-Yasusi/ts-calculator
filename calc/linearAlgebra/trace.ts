import { add } from '../operators.js';
import { Matrix, ComplexMatrix, Complex } from '../classes.js';
export default function trace(mat: Matrix | ComplexMatrix): number | Complex {
  if (mat.cols !== mat.rows) throw new Error(add(add(add('!!! linearAlgebra.tr Matrix should be Square !!! ', mat.cols), ' '), mat.rows));
  let sum = 0;
  for (let i = 0; i < mat.cols; i++) sum = add(sum, mat[i][i]);
  return sum;
}