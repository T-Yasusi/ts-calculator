import Matrix from '../Matrix.js';
import ComplexMatrix from '../ComplexMatrix.js';
import { createUnitMatrix } from './createUnitMatrix.js';
export default function LUDecompose(mat: Matrix | ComplexMatrix): {
  L: Matrix | ComplexMatrix;
  U: Matrix | ComplexMatrix;
  P: Matrix;
} {
  const L = mat instanceof Matrix ? new Matrix(mat.cols, mat.rows) : new ComplexMatrix(mat.cols, mat.rows);
  const U = mat instanceof Matrix ? new Matrix(mat.cols, mat.rows) : new ComplexMatrix(mat.cols, mat.rows);
  const P = createUnitMatrix(mat.cols) as Matrix;
  return {
    L,
    U,
    P
  };
}