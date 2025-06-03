import Vector from './Vector.js';
import { toFormattedPrecision } from './util/toFormattedPrecision.js'

export default class Matrix extends Array<Vector> {
  static get [Symbol.species]() { return Array; }

  constructor(...args: number[][] | [number, number]) {
    if( args.length === 2 && args.every(a=> Number.isInteger(a)) ){
      const cols=args[0] as number;
      const rows=args[1] as number;
      super(...Array(cols).fill(new Vector(rows)));
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

  static fromArray(array: number[][]): Matrix {
    const vectors = array.map(row => new Vector(...row));
    return new Matrix(...vectors);
  }

  get cols(): number {
    return this.length;
  }

  get rows(): number {
    return this[0].length;
  }

  add(other: Matrix): Matrix {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error("Matrix dimensions must match for addition.");
    }
    const result = this.map((row, i) => row.add(other[i] as Vector));
    return new Matrix(...(result as Array<Vector>));
  }

  sub(other: Matrix): Matrix {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error("Matrix dimensions must match for subtraction.");
    }
    const result = this.map((row, i) => row.sub(other[i]));
    return new Matrix(...(result as Array<Vector>));
  }

  mulScalar(scalar: number): Matrix {
    const result = this.map(row => row.mul(scalar)) as Vector[];
    return new Matrix(...result);
  }

  mulMatrix(other: Matrix): Matrix {
    if (this.cols !== other.rows) {
      throw new Error("Matrix multiplication dimension mismatch.");
    }

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

  mulVector(vector: Vector): Vector {
    if (this.cols !== vector.length) {
      throw new Error("Matrix-vector multiplication dimension mismatch.");
    }
    const result = this.map(row => row.dot(vector));
    return new Vector(...(result as Array<number>));
  }

  mul(arg: number | Vector | Matrix): Matrix | Vector {
    if (typeof arg === "number") {
      return this.mulScalar(arg);
    } else if (arg instanceof Vector) {
      return this.mulVector(arg);
    } else if (arg instanceof Matrix) {
      return this.mulMatrix(arg);
    } else {
      throw new Error("Unsupported type for Matrix multiplication.");
    }
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
    let maxLength = 0;
      for( let i=0; i<this.cols; i++){
        for( let j=0; j<this.rows; j++){
          console.log(formatted[i][j].length);
          if( maxLength<formatted[i][j].length ) maxLength = formatted[i][j].length;
        }
    }
//    console.log(maxLength);
    const padded = formatted.map(row=> row.map(s=> s.padStart(maxLength)) );

    return padded.map(row=> (`| ${row.join(', ')} |`)).join('\n');
  }
}
