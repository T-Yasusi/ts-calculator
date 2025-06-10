import { Complex, Vector, Matrix, ComplexVector, ComplexMatrix } from '../modules/calc/classes.js';
import { add, sub, mul, div, neg } from '../modules/calc/operators.js';
import { bastow } from '../modules/calc/solver.js'
import { frame, eigenVectorFromValue, gaussianElimination } from '../modules/calc/linearAlgebra.js';

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

console.log('A =\n', A.toPrecision(3));

const coffs = frame(A);
const eigens = bastow(coffs);

let Q = new ComplexMatrix(N, N);
for( let i=0; i<eigens.length; i++ ){
	console.log(`Eign Value[${i}] = ${eigens[i].toPrecision(3)}`);
	const eigenVector = eigenVectorFromValue(eigens[i], A);
	console.log(`Eigen Vector[${i}] = ${eigenVector.toPrecision(3)}`);
	console.log('  > A*v =', (A*eigenVector).toPrecision(3));
	console.log('  > λ*v =', (eigens[i]*eigenVector).toPrecision(3));
	Q[i] = eigenVector;
}
Q = Q.transpose();
const revQ = gaussianElimination(Q);
// console.log((revQ*Q).toPrecision(3));

console.log('Q =\n', Q.toPrecision(3));
// console.log('Q^T*Q =\n', (Q.conj()*Q).toPrecision(3));
console.log('Q^{-1}A*Q =\n', (revQ*A*Q).toPrecision(3));
