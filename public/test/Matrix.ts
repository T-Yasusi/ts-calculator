import { Complex, Vector, Matrix, ComplexVector } from '../modules/calc/classes.js';
import { add, sub, mul, div, neg } from '../modules/calc/operators.js';

const cvec = new ComplexVector([ new Complex(1, 0), new Complex(1, 1), new Complex(0, 1) ]);
const vec  = new Vector( 1, 2, 3 );
const vec2 = new Vector( 1, 1, 1 );
const mat = new Matrix([ [ 1, 2, 3 ], [ 3, 4, 5 ], [ 6, 7, 8]]);
const mat2 = new Matrix( [ 3, 2, 1 ], [ -2, 4, -2 ], [ -9, 0, 8] );
const mat3 = new Matrix(2, 4);

console.log('aaa');
console.log(vec.toEffDigits(5));
// console.log(mat);
// console.log(mat2);
// console.log(mat3);
// console.log(mat3.toString());
console.log('bbb');
// console.log(vec);

// console.log(mat3[3][1]);