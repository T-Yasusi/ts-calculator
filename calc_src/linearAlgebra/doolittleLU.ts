import { Complex } from '../Complex.js'
import Matrix from '../Matrix.js'
import ComplexMatrix from '../ComplexMatrix.js'
import { abs, exp } from '../functions.js'
import searchPivot from './searchPivot.js'
import swapRow from './swapRow.js'
import { createUnitMatrix } from './createUnitMatrix.js'
import { add, sub, mul, div } from '../operators.js'

export default function doolittleLU(mat: Matrix | ComplexMatrix ):    
    { L: Matrix | ComplexMatrix; U: Matrix | ComplexMatrix; P: Matrix }
{
    if( mat.cols !== mat.rows ) throw new Error("!!! Doolittle LU decomposition  not Square Matrix !!!");
    const LU = mat instanceof Matrix ? new Matrix(...mat) : new ComplexMatrix(...mat);
    const P = createUnitMatrix(mat.cols);

    for( let k=0; k<mat.cols; k++ ){
        const pivot=searchPivot(LU, k);
        if( pivot !== k ){
            swapRow(LU, k, pivot);
            swapRow(P,  k, pivot);
        }
        if( abs(LU[k][k])<1.0e-10 ) throw new Error('!!! LU decomposition A is singular !!!');

        for( let i=k+1; i<mat.cols; i++){
            LU[i][k] = LU[i][k] / LU[k][k];
            for( let j=k+1; j<mat.rows; j++ ) LU[i][j] = LU[i][j] - LU[i][k] * LU[k][j];
        }
    }

    const L = mat instanceof Matrix ? new Matrix(mat.cols, mat.rows) : new ComplexMatrix(mat.cols, mat.rows);
    const U = mat instanceof Matrix ? new Matrix(mat.cols, mat.rows) : new ComplexMatrix(mat.cols, mat.rows);
    for( let i=0; i<mat.cols; i++ ){
        for( let j=0; j<mat.rows; j++){
            if( i>j ) L[i][j] = LU[i][j];
            else if( i === j ){
                L[i][j] = mat instanceof Matrix ? 1 : new Complex(1, 0);
                U[i][j] = LU[i][j];
            }
            else U[i][j] = LU[i][j];
        }
    }
    return { L, U, P };   
}