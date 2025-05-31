import { add, sub, mul, div } from '../modules/calc/operators.js'
import { Complex } from '../modules/calc/Complex.js'

const z1 = new Complex(1, 2);
const z2 = new Complex(2, 3);
const z3 = new Complex(3, 2);

console.log((z1+z2-z3).toString());
console.log((z1*z2/z3).toString());