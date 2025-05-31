import d {iff } from '../modules/calc/diff.js'
import { add, sub, mul, div } from '../modules/calc/operators.js'

const n=2;
const func = (x : number) => x * x - n;

let x0 = 2;
let x1 = x0 - func(x0) / diff.central(func, x0);
let counter=0;

while( Math.abs(x0-x1) > 1.0e-8 ){
    counter++;
    x0 = x1;
    x1 = x0 - func(x0) / diff.central(func, x0);
    console.log('Counter =', counter, ' x =', x1, ' dx =', Math.abs(x0-x1));
}
console.log('Result x =', x1, '  Correct Val =', Math.sqrt(n));
