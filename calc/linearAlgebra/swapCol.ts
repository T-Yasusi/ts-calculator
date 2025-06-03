import Matrix from '../Matrix.js'
import ComplexMatrix from '../ComplexMatrix.js'

export default function swapCol(mat : Matrix | ComplexMatrix, i: number, j: number): void {
   for( let k=0; k<mat.cols; k++ ){
      const temp = mat[i][k];
      mat[i][k] = mat[j][k];
      mat[j][k] = temp;
   }
}