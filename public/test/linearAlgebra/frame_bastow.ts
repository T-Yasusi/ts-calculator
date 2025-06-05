import { Complex, Vector, Matrix, ComplexVector, ComplexMatrix } from '../modules/calc/classes.js';
import { add, sub, mul, div, neg } from '../modules/calc/operators.js';
import { bastow } from '../modules/calc/solver.js'
import { frame } from '../modules/calc/linearAlgebra.js';

const mat = new Matrix( [ 4,  1,  0,  0 ],
      	    		[ 1,  4,  1,  0 ],
			[ 0,  1,  4,  1 ],
			[ 0,  0,  1,  4 ] );

const coffs = frame(mat);
const eigns = bastow(coffs);
console.log(coffs);
console.log(eigns);