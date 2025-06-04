import { IComplexMatrix } from './interface/IComplexMatrix.js'
import { add, sub, mul, div } from './operators.js'
import { Complex } from './Complex.js';
import ComplexVector from './ComplexVector.js';
import Matrix from './Matrix.js';
import Vector from './Vector.js';

export default class ComplexMatrix extends Array<ComplexVector> implements IComplexMatrix {
  static get [Symbol.species]() { return Array; }

  constructor(...args: Complex[][] | [number, number]) {
    if( args.length === 2 && args.every(a=> Number.isInteger(a)) ){
      const cols=args[0] as number;
      const rows=args[1] as number;
      super(...Array.from({ length: rows }, ()=> new ComplexVector(rows)));
    }else if( args.every(a=> Array.isArray(a)) && args.every(a=> a.every(a=> a instanceof Complex)) ){
      super(...args.map(a=> new ComplexVector(...a)));
    }
    else if( args.every(a=> Array.isArray(a)) && args.every(a=> a.every(a=> Array.isArray(a))) 
      && args.every(a=> a.every(a=> a.every(a=> a instanceof Complex))) ){
      super(...args[0].map(a=> new ComplexVector(...a)));
    }
    else throw new Error('!!! ComplexMatrix.constructo Invaild arguments !!!')
  }

  get rows(): number { return this.length; }
  get cols(): number { return this[0].length }

  add(other: ComplexMatrix | Matrix): ComplexMatrix {
    if (this.rows !== other.rows || this.cols !== other.cols) throw new Error("Matrix dimensions must match for addition.");
    const result = this.map((row, i) => (row.add(other[i])));
    return new ComplexMatrix(...(result as Array<ComplexVector>));
  }

  sub(other: ComplexMatrix | Matrix): ComplexMatrix {
    if (this.rows !== other.rows || this.cols !== other.cols) throw new Error("Matrix dimensions must match for subtraction.");
    const result = this.map((row, i) => row.sub(other[i]));
    return new ComplexMatrix(...(result as Array<ComplexVector>));
  }

  mulScalar(scalar: number | Complex): ComplexMatrix {
    const result = this.map(row => row.mul(scalar)) as ComplexVector[];
    return new ComplexMatrix(...result);
  }

  mulMatrix(other: ComplexMatrix | Matrix): ComplexMatrix {
    if (this.cols !== other.rows) throw new Error("Matrix multiplication dimension mismatch.");

    const result: ComplexVector[] = [];

    for (let i = 0; i < this.rows; i++) {
      const row = this[i];
      const newRow: Complex[] = [];
      for (let j = 0; j < other.cols; j++) {
        let sum = new Complex(0, 0);
        for (let k = 0; k < this.cols; k++) {
          sum = add(sum, mul(row[k], other[k][j]));
        }
        newRow.push(sum);
      }
      result.push(new ComplexVector(...newRow));
    }

    return new ComplexMatrix(...result);
  }

  mulVector(vector: ComplexVector | Vector): ComplexVector {
    if (this.cols !== vector.length) throw new Error("Matrix-vector multiplication dimension mismatch.");
    const result = this.map(row => row.dot(vector));
    return new ComplexVector(...(result as Array<Complex>));
  }

  mul(arg: number | Complex | Vector | ComplexVector | Matrix | ComplexMatrix): ComplexMatrix | ComplexVector {
    if (typeof arg === "number" || arg instanceof Complex) {
      return this.mulScalar(arg);
    } else if (arg instanceof ComplexVector || arg instanceof Vector) {
      return this.mulVector(arg);
    } else if (arg instanceof ComplexMatrix || arg instanceof Matrix) {
      return this.mulMatrix(arg);
    } else  throw new Error("Unsupported type for Matrix multiplication.");
  }

  transpose(): ComplexMatrix {
    const transposedRows: ComplexVector[] = [];
    for (let j = 0; j < this.cols; j++) {
      const col = this.map(row => row[j]);
      transposedRows.push(new ComplexVector(...col));
    }
    return new ComplexMatrix(...transposedRows);
  }

  toPrecision(precision: number): string {
    const formatted: string[][] = this.map(row => row.map(x => x.toPrecision(precision)));
    const maxLength = formatted.reduce((max, a)=> Math.max(max, a.reduce((max, s)=> Math.max(max, s.length),0)), 0);
    const padded = formatted.map(row=> row.map(s=> s.padStart(maxLength)) );

    return padded.map(row=> (`| ${row.join(', ')} |`)).join('\n');
  }
}
