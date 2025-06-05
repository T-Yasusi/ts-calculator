import { add, sub, mul, div, neg } from '../modules/calc/operators.js';
import { bastow } from '../modules/calc/solver.js'; 
import { pow } from '../modules/calc/functions.js'

function createPolynomial(coeffs: number[]): (x: number) => number {
  return (x: number): number => {
    return coeffs.reduce((acc, coeff, i) => {
      const power = coeffs.length - 1 - i;
      return acc + coeff * pow(x, power);
    }, 0);
  };
}

const coffs = [ 1, 2, -1, 3, -1, 2, 1, 1 ];
const ans = bastow(coffs);

const func = createPolynomial(coffs);

for( let i=0; i<ans.length; i++ ){
     console.log(`Answer[${i}] =`, ans[i].toPrecision(3), '  f(x) =', func(ans[i]).toPrecision(3));
}


