import { Complex, Vector, Matrix, ComplexVector, ComplexMatrix } from '../modules/calc/classes.js';
import { add, sub, mul, div, neg } from '../modules/calc/operators.js';
import { doolittleLU, croutLU } from '../modules/calc/linearAlgebra.js';

const mat = new Matrix( [ 4, 3, 2,  1 ],
                        [ 3, 6, 5,  4 ],
                        [ 2, 5, 8,  7 ],
                        [ 1, 4, 7, 10 ]);

const { L: dL, U: dU, P: dP } = doolittleLU(mat);
const { L: cL, U: cU, P: cP } = croutLU(mat);

console.log('Input =\n', mat.toPrecision(3));

console.log('==== Doolittle =========');
console.log('L =\n', dL.toPrecision(3));
console.log('U =\n', dU.toPrecision(3));
console.log('L*U =\n', (dL*dU).toPrecision(3));

console.log('==== Cout ==============');
console.log('L =\n', cL.toPrecision(3));
console.log('U =\n', cU.toPrecision(3));
console.log('L*U =\n', (cL*cU).toPrecision(3));

const cmat = new ComplexMatrix(
   [ new Complex(1, 1), new Complex(2, 3), new Complex(3, -4), new Complex(4, -4) ],
   [ new Complex(2, 1), new Complex(2, 2), new Complex(2, -4), new Complex(-4, 2) ],
   [ new Complex(0, 1), new Complex(3, -2), new Complex(5, -4), new Complex(1, 3) ],
   [ new Complex(2, 1), new Complex(1, -2), new Complex(2, -4), new Complex(3, 3) ] );

const { L: L2, U: U2, P: P2 } = doolittleLU(cmat);

console.log('===== Complex Version =====');
console.log('Input =\n', cmat.toPrecision(3));
console.log('L =\n', L2.toPrecision(3));
console.log('U =\n', U2.toPrecision(3));
console.log('L*U =\n', (P2*L2*U2).toPrecision(3));
