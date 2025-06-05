import { Complex, Vector, Matrix, ComplexVector, ComplexMatrix } from '../modules/calc/classes.js';
import { add, sub, mul, div, neg } from '../modules/calc/operators.js';
import { doolittleLU } from '../modules/calc/linearAlgebra.js';

const mat = new Matrix( [ 4, 1, -2, 2  ],
                        [ 1, 2,  0, 1  ],
                        [ -2, 0, 3, -2 ],
                        [ 2, 1, -2, -1 ]);

const { L, U, P } = doolittleLU(mat);

console.log('A =\n', mat.toPrecision(3));
console.log('L*U =\n',(L*U).toPrecision(3));
console.log('P*A =\n',(P*mat).toPrecision(3));

const cmat = new ComplexMatrix( [ new Complex(1, 0), new Complex(2, 1), new Complex(3, -1) ],
                                [ new Complex(4, 2), new Complex(5, 0), new Complex(6,  1) ],
                                [ new Complex(7, -1), new Complex(8, 3), new Complex(9, 0) ] );

const { L: L2, U: U2, P: P2 } = doolittleLU(cmat);

console.log('C =\n', cmat.toPrecision(3));
console.log('L*U =\n',(L2*U2).toPrecision(3));
console.log('P*A =\n',(P2*cmat).toPrecision(3));

