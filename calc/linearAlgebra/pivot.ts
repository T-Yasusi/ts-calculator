import Matrix from '../Matrix.js'
import ComplexMatrix from '../ComplexMatrix.js'
import { abs } from '../functions.js'


export default function pivot(mat: Matrix | ComplexMatrix, i: number): number {
    let max = abs(mat[i][i]);
    let pivot = i;
    for( let k=i; k<mat.cols; k++){
        if( abs(mat[k][i]) > max ){
            max = abs(mat[k][i]);
            pivot = k;
        }
    }
    return pivot;
}