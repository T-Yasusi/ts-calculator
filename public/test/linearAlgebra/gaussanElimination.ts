import { Complex, Vector, Matrix, ComplexVector, ComplexMatrix } from '../modules/calc/classes.js';
import { add, sub, mul, div, neg } from '../modules/calc/operators.js';
import { gaussianElimination } from '../modules/calc/linearAlgebra.js';

const cmat = new ComplexMatrix(
   [ new Complex(1, 1), new Complex(2, 3), new Complex(3, -4) ],
   [ new Complex(2, 1), new Complex(2, 2), new Complex(2, -4) ],
   [ new Complex(0, 1), new Complex(3, -2), new Complex(5, -4) ] );

const rev = gaussianElimination(cmat);

console.log('A =\n', cmat.toPrecision(3));
console.log('A^{-1} =\n', rev.toPrecision(3));
console.log('A*A^{-1} =\n', (cmat*rev).toPrecision(3));