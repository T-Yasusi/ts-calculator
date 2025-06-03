import Vector from './Vector.js';
import ComplexVector from './ComplexVector.js';
import ComplexMatrix from './ComplexMatrix.js';
import { toFormattedPrecision } from './util/toFormattedPrecision.js';
import { add, mul } from './operators.js';
import { Complex } from './Complex.js';
export default class Matrix extends Array {
    static get [Symbol.species]() { return Array; }
    constructor(...args) {
        if (args.length === 2 && args.every(a => Number.isInteger(a))) {
            const cols = args[0];
            const rows = args[1];
            super(...Array(cols).fill(new Vector(rows)));
        }
        else if (args.every(a => Array.isArray(a)) && args.every(a => a.every(a => typeof a === 'number'))) {
            super(...args.map(a => new Vector(...a)));
        }
        else if (args.every(a => Array.isArray(a)) && args.every(a => a.every(a => Array.isArray(a)))
            && args.every(a => a.every(a => a.every(a => typeof a === 'number')))) {
            super(...args[0].map(a => new Vector(...a)));
        }
        else {
            console.log(args);
            throw new Error('!!! Matrix.constructo Invaild arguments !!!');
        }
    }
    get cols() { return this.length; }
    get rows() { return this[0].length; }
    add(other) {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            throw new Error("Matrix dimensions must match for addition.");
        }
        const result = this.map((row, i) => row.add(other[i]));
        if (other instanceof Matrix)
            return new Matrix(...result);
        else if (other instanceof ComplexMatrix)
            return new ComplexMatrix(...result);
        throw new Error('!!! Matrix.add Invaild type !!!');
    }
    sub(other) {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            throw new Error("Matrix dimensions must match for subtraction.");
        }
        const result = this.map((row, i) => row.sub(other[i]));
        if (other instanceof Matrix)
            return new Matrix(...result);
        else if (other instanceof ComplexMatrix)
            return new ComplexMatrix(...result);
        throw new Error('!!! Matrix.add Invaild type !!!');
    }
    mulScalar(scalar) {
        if (typeof scalar === 'number') {
            const result = this.map(row => row.mul(scalar));
            return new Matrix(...result);
        }
        else if (scalar instanceof Complex) {
            const result = this.map(row => row.mul(scalar));
            return new ComplexMatrix(...(result));
        }
        throw new Error('!!! Matrix.mulScalar Invaild type !!!');
    }
    mulMatrix(other) {
        if (this.cols !== other.rows)
            throw new Error("Matrix multiplication dimension mismatch.");
        if (other instanceof Matrix) {
            const result = [];
            for (let i = 0; i < this.rows; i++) {
                const row = this[i];
                const newRow = [];
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
        else if (other instanceof ComplexMatrix) {
            const result = [];
            for (let i = 0; i < this.rows; i++) {
                const row = this[i];
                const newRow = [];
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
    mulVector(vector) {
        if (this.cols !== vector.length)
            throw new Error("Matrix-vector multiplication dimension mismatch.");
        const result = this.map(row => row.dot(vector));
        if (vector instanceof Vector)
            return new Vector(...result);
        else if (vector instanceof ComplexVector)
            return new ComplexVector(...result);
        throw new Error('!!! Matrix.dotVector Invaild type !!!');
    }
    mul(arg) {
        if (typeof arg === "number" || arg instanceof Complex) {
            return this.mulScalar(arg);
        }
        else if (arg instanceof Vector || arg instanceof ComplexVector) {
            return this.mulVector(arg);
        }
        else if (arg instanceof Matrix || arg instanceof ComplexMatrix) {
            return this.mulMatrix(arg);
        }
        else
            throw new Error("Unsupported type for Matrix multiplication.");
    }
    transpose() {
        const transposedRows = [];
        for (let j = 0; j < this.cols; j++) {
            const col = this.map(row => row[j]);
            transposedRows.push(new Vector(...col));
        }
        return new Matrix(...transposedRows);
    }
    toPrecision(precision) {
        const formatted = this.map(row => row.map(x => toFormattedPrecision(x, precision)));
        const maxLength = formatted.reduce((max, a) => Math.max(max, a.reduce((max, s) => Math.max(max, s.length), 0)), 0);
        const padded = formatted.map(row => row.map(s => s.padStart(maxLength)));
        return padded.map(row => (`| ${row.join(', ')} |`)).join('\n');
    }
}
