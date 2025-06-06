import { Complex, Vector, Matrix, ComplexVector, ComplexMatrix } from '../modules/calc/classes.js';
import { add, sub, mul, div, neg } from '../modules/calc/operators.js';
import { bastow } from '../modules/calc/solver.js'
import { frame, eigenVectorFromValue } from '../modules/calc/linearAlgebra.js';

function randomInt(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min; }
const N=10;
const min = -10, max = 10;
let A = new Matrix(N, N);
for( let i=0; i<N; i++ ){
	for( let j=i; j<N; j++ ) A[i][j]=randomInt(min, max);
//	for( let j=0; j<N; j++ ) A[i][j]=randomInt(min, max);
}
console.log(A.toPrecision(3));
// const A = new Matrix( [ 11, 8, 5, 10 ], 
//		      [ 14, 1, 4, 15 ], 
//		      [ 2, 13, 16, 3 ],
//		      [ 7, 12, 9, 6 ] );


const coffs = frame(A);
// console.log(coffs);
const eigens = bastow(coffs);
for( let i=0; i<eigens.length; i++ ){
	console.log(`Eign Value[${i}] = ${eigens[i].toPrecision(3)}`);
	const eigenVector = eigenVectorFromValue(eigens[i], A);
	console.log(`Eigen Vector[${i}] = ${eigenVector.toPrecision(3)}`);
	console.log('  > A*v =', (A*eigenVector).toPrecision(3));
	console.log('  > λ*v =', (eigens[i]*eigenVector).toPrecision(3));
}