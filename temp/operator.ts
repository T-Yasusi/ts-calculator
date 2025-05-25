import { add } from '../modules/operators.js';
import { Complex } from '../modules/Complex.js';
const x1 = 0;
const x2 = 1;
const z1 = new Complex(1, 1);
const z2 = new Complex(0, 1);
console.log(add(x1, x2));
console.log(add(z1, z2));