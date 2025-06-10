import { Complex, Vector, Matrix, ComplexVector, ComplexMatrix } from '../modules/calc/classes.js';
import { add, sub, mul, div, neg } from '../modules/calc/operators.js';

const Z1 = new ComplexMatrix( [ new Complex(1, 0), new Complex(0, 1), new Complex(3, 0) ],
                              [ new Complex(2, 1), new Complex(-2, 1), new Complex(2, 1) ] );

const Z2 = new ComplexMatrix( [ new Complex(1, 0), new Complex(0, 1)  ],
                              [ new Complex(2, 1), new Complex(-2, 1) ],
                              [ new Complex(4, 3), new Complex(2, 1)  ] );

console.log(Z1.toPrecision(3)+'\n');
console.log(Z2.toPrecision(3)+'\n');
console.log((Z1*Z2).toPrecision(3));

console.log(Z1.rowVector(0));
console.log(Z1.colVector(0));

console.log(Z1.rowVector(0).conj()*Z2.colVector(0))
console.log(Z1.rowVector(1).conj()*Z2.colVector(0))


const A = new Matrix(4, 3);
const Z = new ComplexMatrix(4, 3);

console.log(A);
console.log(Z);
