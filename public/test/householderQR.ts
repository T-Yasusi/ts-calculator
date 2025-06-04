import { Complex, Vector, Matrix, ComplexVector, ComplexMatrix } from '../modules/calc/classes.js';
import { add, sub, mul, div, neg } from '../modules/calc/operators.js';
import { householderQR } from '../modules/calc/linearAlgebra.js';

const mat = new Matrix( [ 4, 1, -2, 2  ],
      	    		[ 1, 2,  0, 1  ],
			[ -2, 0, 3, -2 ],
			[ 2, 1, -2, -1 ]);

// const { Q, R } = householderQR(mat);

// console.log('A =\n', mat.toPrecision(3));
// console.log('Q*R =\n',(Q*R).toPrecision(3));
// console.log('Q^T*Q=\n', (Q.transpose()*Q).toPrecision(3));

const cmat = new ComplexMatrix( [ new Complex(1, 0), new Complex(2, 1), new Complex(3, -1) ],
      	     	 		[ new Complex(4, 2), new Complex(5, 0), new Complex(6,  1) ],
				[ new Complex(7, -1), new Complex(8, 3), new Complex(9, 0) ] );

const { Q: Q2, R: R2 } = householderQR(cmat);

console.log('C =\n', mat.toPrecision(3));
console.log('Q*R =\n',(Q2*R2).toPrecision(3));
console.log('conj(Q)*Q=\n', (Q2.conj()*Q2).toPrecision(3));
