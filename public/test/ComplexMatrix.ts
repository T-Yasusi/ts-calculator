import { Complex, Vector, Matrix, ComplexVector, ComplexMatrix } from '../modules/calc/classes.js';
import { add, sub, mul, div, neg } from '../modules/calc/operators.js';

const A = new ComplexMatrix( [ new Complex(1, 1), new Complex(2, 0),  new Complex(3, -1) ],
			     [ new Complex(0, 0), new Complex(-1, 1), new Complex(4,  0) ],
			     [ new Complex(0, 2), new Complex(1, -1), new Complex(0,  0) ] );

const B = new ComplexMatrix( [ new Complex(2, 0), new Complex(0, 1),  new Complex(0, 0) ],
			     [ new Complex(1, -1), new Complex(0, 0), new Complex(3, 0) ],
			     [ new Complex(0, -2), new Complex(1, 0), new Complex(1, 1) ] );

console.log(A);
console.log(A.toPrecision(3));
console.log((A*B).toPrecision(3));

// A*B= | 2 - 6i,   2, 10 - 2i |
//      |    -6i,   4,  1 + 7i |
//      |     2i,  -2,  3 - 3i |
