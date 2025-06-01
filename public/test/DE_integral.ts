import integral from '../modules/calc/integral.js'
import { add, sub, mul, div, neg } from '../modules/calc/operators.js'
import { sin, cos, exp, log, sqrt } from '../modules/calc/functions.js'

console.log('===== Integral [ -Inf : Inf ] check ======================');
console.log('Gauss Integral : f(x) = exp(-x^2) :', 
    integral.minusInfToInf(x=> exp(-x*x)), ' Correct Val =', Math.sqrt(Math.PI));
console.log('Lorentz type : f(x) = 1/(1+x^2) :', 
    integral.minusInfToInf(x=> 1/(1+x*x)), ' Correct Val =', Math.PI);
console.log('f(x) = x*exp(-x^2) :', 
    integral.minusInfToInf(x=> x*exp(-x*x)), ' Correct Val =', 0);

console.log('===== Integral [ 0 : Inf ] check =========================');
console.log('f(x) = e^(-1) :', 
    integral.zeroToInf(x=> exp(-x)), ' Correct Val =', 1);
console.log('Gamma Func : f(x) = x^2*exp(-x) :', 
    integral.zeroToInf(x=> x*x*exp(-x)), ' Correct Val =', 2);
console.log('Rational Decay : f(x) = x/(1+x^2)^2 : ', 
    integral.zeroToInf(x=> x/(1+x**2)**2), ' Correct Val =', 1/2);

console.log('===== Integral [ -1 : 1 ] w/ singlarity point check ======');

console.log('f(x) = 1/√(1-x^2) : ', 
    integral.minusOneToOne(x=> 1/sqrt(1-x*x)), ' Correct Val =', Math.PI);
console.log('f(x) = log(1+x)/√(1-x^2) :', 
    integral.minusOneToOne(x=> log(1+x)/sqrt(1-x*x)), ' Correct Val =', -Math.PI*log(2));
console.log('f(x) = x^2/√(1-x^2) :', 
    integral.minusOneToOne(x=> x*x/sqrt(1-x*x)), ' Correct Val =', Math.PI/2);
