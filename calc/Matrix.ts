import { IMatrix } from './interface/IMatrix.js'
import Vector from './Vector.js';
import ComplexVector from './ComplexVector.js'
import ComplexMatrix from './ComplexMatrix.js'
import { toFormattedPrecision } from './util/toFormattedPrecision.js'
import { add, sub, mul, div, neg } from './operators.js'
import { Complex } from './Complex.js';

export default class Matrix extends Array<Vector> implements IMatrix {
  static get [Symbol.species]() { return Array; }

  constructor(...args: number[][] | [number, number]) {
    if( args.length === 2 && args.every(a=> Number.isInteger(a)) ){
      const cols=args[0] as number;
      const rows=args[1] as number;
      super(...Array.from({ length: cols }, ()=> new Vector(rows)));
    }else if( args.every(a=> Array.isArray(a)) && args.every(a=> a.every(a=> typeof a === 'number')) ){
      super(...args.map(a=> new Vector(...a)));
    }
    else if( args.every(a=> Array.isArray(a)) && args.every(a=> a.every(a=> Array.isArray(a))) 
      && args.every(a=> a.every(a=> a.every(a=> typeof a==='number'))) ){
      super(...args[0].map(a=> new Vector(...a)));
    }
    else{
      console.log(args);
      throw new Error('!!! Matrix.constructo Invaild arguments !!!');
    }
  }

  get cols(): number { return this.length; }
  get rows(): number { return this[0].length; }

  rowVector(i: number): Vector { return new Vector(...this[i]) }
  colVector(i: number): Vector { return new Vector(...this.map(row => row[i])) }

  add(other: Matrix | ComplexMatrix ): Matrix | ComplexMatrix {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error("Matrix dimensions must match for addition.");
    }
    const result = this.map((row, i) => row.add(other[i] as Vector));
    if( other instanceof Matrix ) return new Matrix(...(result as Array<Vector>));
    else if( other instanceof ComplexMatrix ) return new ComplexMatrix(...(result as Array<ComplexVector>));
    throw new Error('!!! Matrix.add Invaild type !!!')
  }

  sub(other: Matrix | ComplexMatrix): Matrix | ComplexMatrix {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error("Matrix dimensions must match for subtraction.");
    }
    const result = this.map((row, i) => row.sub(other[i]));
    if( other instanceof Matrix ) return new Matrix(...(result as Array<Vector>));
    else if( other instanceof ComplexMatrix ) return new ComplexMatrix(...(result as Array<ComplexVector>));
    throw new Error('!!! Matrix.add Invaild type !!!')
  }

  mulScalar(scalar: number | Complex): Matrix | ComplexMatrix {
    if( typeof scalar === 'number'){
      const result = this.map(row => row.mul(scalar)) as Vector[];
      return new Matrix(...result);
    }
    else if( scalar instanceof Complex){
      const result = this.map(row => row.mul(scalar)) as ComplexVector[];
      return new ComplexMatrix(...(result));
    }
    throw new Error('!!! Matrix.mulScalar Invaild type !!!')
  }

  mulMatrix(other: Matrix | ComplexMatrix ): Matrix | ComplexMatrix {
    if (this.cols !== other.rows) throw new Error("Matrix multiplication dimension mismatch.");

    if( other instanceof Matrix ){
      const result: Vector[] = [];

      for (let i = 0; i < this.rows; i++) {
        const row = this[i];
        const newRow: number[] = [];
        for (let j = 0; j < other.cols; j++) {
          let sum = 0;
          for (let k = 0; k < this.cols; k++) {
            sum += row[k] * other[k][j];
          }
          newRow.push(sum);
        }
        result.push(new Vector(...newRow));
      }
      return new Matrix(...result);
    }
    else if( other instanceof ComplexMatrix ){
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
    throw new Error('!!! Matrix.dotMatrix Invaild type !!!');
  }

  mulVector(vector: Vector | ComplexVector): Vector | ComplexVector{
    if (this.cols !== vector.length) throw new Error("Matrix-vector multiplication dimension mismatch.");
  
    const result = this.map(row => row.dot(vector));
    if( vector instanceof Vector ) return new Vector(...(result as Array<number>));
    else if( vector instanceof ComplexVector ) return new ComplexVector(...(result as Array<Complex>));
    throw new Error('!!! Matrix.dotVector Invaild type !!!');
  }

  mul(arg: number | Complex | Vector | ComplexVector | Matrix | ComplexMatrix): 
    Matrix | ComplexMatrix | Vector | ComplexVector {
    if (typeof arg === "number" || arg instanceof Complex) {
      return this.mulScalar(arg);
    } else if (arg instanceof Vector || arg instanceof ComplexVector) {
      return this.mulVector(arg);
    } else if (arg instanceof Matrix || arg instanceof ComplexMatrix) {
      return this.mulMatrix(arg);
    } else throw new Error("Unsupported type for Matrix multiplication.");
  }

  transpose(): Matrix {
    const transposedRows: Vector[] = [];
    for (let j = 0; j < this.cols; j++) {
      const col = this.map(row => row[j]);
      transposedRows.push(new Vector(...col));
    }
    return new Matrix(...transposedRows);
  }

  toPrecision(precision: number): string {
    const formatted: string[][] = this.map(row => row.map(x => toFormattedPrecision(x, precision)));
    const maxLength = formatted.reduce((max, a)=> Math.max(max, a.reduce((max, s)=> Math.max(max, s.length),0)), 0);
    const padded = formatted.map(row=> row.map(s=> s.padStart(maxLength)) );

    return padded.map(row=> (`| ${row.join(', ')} |`)).join('\n');
  }
}
