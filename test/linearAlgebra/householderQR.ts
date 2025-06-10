import { Complex, Vector, Matrix, ComplexVector, ComplexMatrix } from '../modules/calc/classes.js';
import { add, sub, mul, div, neg } from '../modules/calc/operators.js';
import { householderQR } from '../modules/calc/linearAlgebra.js';

function randomInt(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min; }
const N=6;
const min = -10, max = 10;
let A = new Matrix(N, N);
for( let i=0; i<N; i++ ){
	for( let j=0; j<N; j++ ) A[i][j]=randomInt(min, max); // ランダム行列
//	for( let j=i; j<N; j++ ){  // 対称行列
//		const a=randomInt(min, max); 
//		A[i][j]=a;
//		A[j][i]=a;
//	}
}

const { Q, R } = householderQR(A);

console.log('A =\n', A.toPrecision(3));
console.log('Q*R =\n',(Q*R).toPrecision(3));
console.log('Q =\n', Q.toPrecision(3));
console.log('R =\n', R.toPrecision(3));
console.log('Q^T*Q=\n', (Q.transpose()*Q).toPrecision(3));

