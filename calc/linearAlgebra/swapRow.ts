import Matrix from '../Matrix.js'
import ComplexMatrix from '../ComplexMatrix.js'

export default function swapRow(mat : Matrix | ComplexMatrix, i: number, j: number): void {
   const temp = mat[i];
   mat[i] = mat[j];
   mat[j] = temp;
}