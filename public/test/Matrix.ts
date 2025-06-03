import { Complex, Vector, Matrix, ComplexVector } from '../modules/calc/classes.js';
import { add, sub, mul, div, neg } from '../modules/calc/operators.js';

const cvec = new ComplexVector([ new Complex(1, 0.05), new Complex(1.3, -1.2), new Complex(0.0001, 1) ]);
const vec  = new Vector( 1, 1.3e-8, 3 );
const vec2 = new Vector( 1, 1, 1 );
console.log('aaa');
const mat3 = new Matrix(2, 4);
console.log('bbb');
const mat = new Matrix([ [ 1, 2, 3 ], [ 3, 4, 5 ], [ 6, 7, 8]]);
const mat2 = new Matrix( [ 3, 2, 1 ], [ -2, 4, -2 ], [ -9, 0, 8] );


console.log('aaa');
console.log(vec.toPrecision(3));
console.log(vec.toPrecision(3, true));

console.log(cvec.toPrecision(3));
console.log(cvec.toPrecision(3, true));
// console.log(mat);
// console.log(mat2);
// console.log(mat3);
console.log(mat3.toString());
console.log('bbb');
// console.log(vec);

// console.log(mat3[3][1]);