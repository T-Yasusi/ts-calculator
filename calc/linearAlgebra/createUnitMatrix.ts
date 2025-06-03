import Matrix from '../Matrix.js';
import { Complex } from '../Complex.js'
import ComplexMatrix from '../ComplexMatrix.js'

export function createUnitMatrix(n: number): Matrix {
    const E=new Matrix(n, n);
    for( let i=0; i<n; i++) E[i][i]=1;
    return E;
}

export function createUnitComplexMatrix(n: number): ComplexMatrix {
    const E=new ComplexMatrix(n, n);
    for( let i=0; i<n; i++) E[i][i]=new Complex(1, 0);
    return E;
}