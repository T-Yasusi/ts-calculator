import { Complex, Vector, Matrix, ComplexVector, ComplexMatrix } from '../modules/calc/classes.js';
import { add, sub, mul, div, neg } from '../modules/calc/operators.js';
import { householderQR, createUnitMatrix } from '../modules/calc/linearAlgebra.js';
import { abs2 } from '../modules/calc/functions.js'

function randomInt(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min; }
const N=8;
const min = -10, max = 10;
const threshold=1.0e-8;
const isPrintAll = true;

let A = new Matrix(N, N);
for( let i=0; i<N; i++ ){
    for( let j=i; j<N; j++ ){
        const a=randomInt(min, max);
        A[i][j] = a;
        A[j][i] = a;
    }
}
let P = createUnitMatrix(N);

let { Q, R } = householderQR(A);

console.log('A =\n', A.toPrecision(3));
console.log('Q*R =\n', (Q*R).toPrecision(3));
console.log('Q =\n', Q.toPrecision(3));
console.log('R =\n', R.toPrecision(3));

P = P*Q;
let eigns = R.map((row, i)=> row[i]);

let counter = 0;
while( counter<1000 ){
    let A2 = R*Q
    const { Q: Q2, R: R2 } = householderQR(A2); 
    Q = Q2;
    R = R2;
    let eigns2 = R.map((row, i)=> row[i]);
    P = P*Q;
    if( isPrintAll ){
        console.log(`===== counter = ${counter} =====`)
        console.log('A =\n', A2.toPrecision(3));
        console.log('Q*R =\n', (Q*R).toPrecision(3));
        console.log('Q =\n', Q.toPrecision(3));
        console.log('Δ(λ) =', eigns.reduce((sum, a, i)=> sum + abs2(a-eigns2[i]), 0));
    }
    if( eigns.reduce((sum, a, i)=> sum + abs2(a-eigns2[i]), 0)<threshold ) break;
    eigns=eigns2;

    counter++;
}
console.log('===== Finish  counter =',counter, " =====");
console.log('A =\n', A.toPrecision(3));
console.log('P =\n', P.toPrecision(3));
console.log('P^T*A*P =\n', (P.transpose()*A*P).toPrecision(3));
console.log('R =\n', R.toPrecision(3))

function frobeniusNormDiff(A: Matrix | Complex, B: Matrix | ComplexMatrix): number {
    let sum = 0;
    for( let i=0; i<A.cols; i++ ){
        for( let j=0; j<A.rows; j++ ){
//            console.log(A[i][j], B[i][j], A[i][j]-B[i][j]);
            sum += abs2(A[i][j]-B[i][j]);
        }
    }
    return Math.sqrt(sum);
}