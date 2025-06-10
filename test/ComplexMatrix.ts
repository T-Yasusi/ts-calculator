import { Complex, Vector, Matrix, ComplexVector, ComplexMatrix } from '../modules/calc/classes.js';
import { add, sub, mul, div, neg } from '../modules/calc/operators.js';

const A = new ComplexMatrix( [ new Complex(1, 1), new Complex(2, 0),  new Complex(3, -1) ],
			     [ new Complex(0, 0), new Complex(-1, 1), new Complex(4,  0) ],
			     [ new Complex(0, 2), new Complex(1, -1), new Complex(0,  0) ] );

const B = new ComplexMatrix( [ new Complex(2, 0), new Complex(0, 1),  new Complex(0, 0) ],
			     [ new Complex(1, -1), new Complex(0, 0), new Complex(3, 0) ],
			     [ new Complex(0, -2), new Complex(1, 0), new Complex(1, 1) ] );

const C = new Matrix( [ 1, 0, 2 ], [ -1, 3, 1 ], [ 0, 0, 1 ] );

const ans = new ComplexMatrix( [ new Complex(2, -6), new Complex(2, 0),  new Complex(10, -2) ],
			       [ new Complex(0, -6), new Complex(4, 0),  new Complex(1, 7)   ],
			       [ new Complex(0, -2), new Complex(-2, 0), new Complex(3, -3)  ] );

const ans2 = new ComplexMatrix( [ new Complex(1,  5), new Complex(4, -2),  new Complex(3, -1) ],
	 		        [ new Complex(-1, 1), new Complex(-4, 2),  new Complex(9, 1)  ],
			        [ new Complex(0,  2), new Complex(1, -1), new Complex(0,  0)  ] );
				
const ans3 = new ComplexMatrix( [ new Complex(-1, 1), new Complex(6,  0),  new Complex(7, 1) ],
	 		        [ new Complex(1, -1), new Complex(-3, 3),  new Complex(3, 1)  ],
			        [ new Complex(-1, 3), new Complex(3, -3),  new Complex(1,  2)  ] );
				

console.log('A =\n', A.toPrecision(3));
console.log('B =\n', B.toPrecision(3));

console.log('A*B =\n', (A*B).toPrecision(3));
console.log('Answer =\n', ans.toPrecision(3));

console.log('C =\n', C.toPrecision(3));

console.log('C*A=\n', (C*A).toPrecision(3));
console.log('Answer =\n', ans2.toPrecision(3));

console.log('A*C=\n', (A*C).toPrecision(3));
console.log('Answer =\n', ans3.toPrecision(3));

