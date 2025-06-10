import { Complex, Vector, Matrix, ComplexVector, ComplexMatrix } from '../modules/calc/classes.js';
import { add, sub, mul, div, neg } from '../modules/calc/operators.js';
import { hessenbergChange, householderQR } from '../modules/calc/linearAlgebra.js';

function randomInt(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min; }
const N=6;
const min = -10, max = 10;
const A = new ComplexMatrix(N, N);
for( let i=0; i<N; i++ ){
        for( let j=0; j<N; j++ ) A[i][j]=new Complex(randomInt(min, max), randomInt(min, max)); // ランダム行列
//      for( let j=i; j<N; j++ ){  // 対称行列
//              a = new Complex(randomInt(min, max), randomInt(min, max));
//              A[i][j]=a;
//              A[j][i]=a.conj();
//      }
}

const H = hessenbergChange(A);

console.log('Original Matrix =\n', A.toPrecision(3));
console.log('Hessenberg Matrix =\n', H.toPrecision(3));
