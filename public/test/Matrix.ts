import { Complex, Vector, Matrix, ComplexVector } from '../modules/calc/classes.js';
import { add, sub, mul, div } from '../modules/calc/operators.js';

const cvec = new ComplexVector([ new Complex(1, 0), new Complex(1, 1), new Complex(0, 1) ]);
const vec  = new Vector( 1, 2, 3 );
const vec2 = new Vector( 1, 1, 1 );
const mat = new Matrix([ [ 1, 2, 3 ], [ 3, 4, 5 ], [ 6, 7, 8]]);

console.log(mat);
console.log(vec);
console.log('aaa');
console.log(vec.map((x, i)=> x + vec2[i]));
console.log('bbb');

console.log(vec2*vec);
console.log(vec2-vec);
console.log(vec2+vec);

