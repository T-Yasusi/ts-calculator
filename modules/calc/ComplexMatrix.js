import { add, mul, div } from './operators.js';
import { Complex } from './Complex.js';
import ComplexVector from './ComplexVector.js';
import Matrix from './Matrix.js';
import Vector from './Vector.js';
export default class ComplexMatrix extends Array {
    static get [Symbol.species]() { return Array; }
    constructor(...args) {
        if (args.length === 2 && args.every(a => Number.isInteger(a))) {
            const cols = args[0];
            const rows = args[1];
            super(...Array.from({ length: cols }, () => new ComplexVector(rows)));
        }
        else if (args.every(a => Array.isArray(a)) && args.every(a => a.every(a => a instanceof Complex))) {
            super(...args.map(a => new ComplexVector(...a)));
        }
        else if (args.every(a => Array.isArray(a)) && args.every(a => a.every(a => Array.isArray(a)))
            && args.every(a => a.every(a => a.every(a => a instanceof Complex)))) {
            super(...args[0].map(a => new ComplexVector(...a)));
        }
        else
            throw new Error('!!! ComplexMatrix.constructor Invaild arguments !!!');
    }
    get rows() { return this.length; }
    get cols() { return this[0].length; }
    rowVector(i) { return this[i].copy(); }
    ;
    colVector(i) { return new ComplexVector(...this.map(row => row[i].copy())); }
    ;
    norm() { return this.frobeniusNorm(); }
    frobeniusNorm() {
        let sum = 0;
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++)
                sum += this[i][j].abs2();
        }
        return sum;
    }
    add(other) {
        if (this.rows !== other.rows || this.cols !== other.cols)
            throw new Error("Matrix dimensions must match for addition.");
        const result = this.map((row, i) => (row.add(other[i])));
        return new ComplexMatrix(...result);
    }
    sub(other) {
        if (this.rows !== other.rows || this.cols !== other.cols)
            throw new Error("Matrix dimensions must match for subtraction.");
        const result = this.map((row, i) => row.sub(other[i]));
        return new ComplexMatrix(...result);
    }
    mulScalar(scalar) {
        const result = this.map(row => row.mul(scalar));
        return new ComplexMatrix(...result);
    }
    div(scalar) {
        if (typeof scalar === 'number' && scalar === 0)
            throw new Error('Division by zero');
        else if (scalar instanceof Complex && scalar.abs() === 0)
            throw new Error('Division by zero');
        return this.mulScalar(div(1, scalar));
    }
    mulMatrix(other) {
        if (this.cols !== other.rows)
            throw new Error("Matrix multiplication dimension mismatch.");
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
    mulVector(vector) {
        if (this.cols !== vector.length)
            throw new Error("Matrix-vector multiplication dimension mismatch.");
        const result = this.map(row => row.reduce((sum, a, i) => add(sum, mul(a, vector[i])), new Complex(0, 0)));
        return new ComplexVector(...result);
    }
    mul(arg) {
        if (typeof arg === "number" || arg instanceof Complex) {
            return this.mulScalar(arg);
        }
        else if (arg instanceof ComplexVector || arg instanceof Vector) {
            return this.mulVector(arg);
        }
        else if (arg instanceof ComplexMatrix || arg instanceof Matrix) {
            return this.mulMatrix(arg);
        }
        else
            throw new Error("Unsupported type for Matrix multiplication.");
    }
    transpose() {
        const transposedRows = [];
        for (let j = 0; j < this.cols; j++) {
            const col = this.map(row => row[j]);
            transposedRows.push(new ComplexVector(...col));
        }
        return new ComplexMatrix(...transposedRows);
    }
    conj() {
        const conjRows = [];
        for (let j = 0; j < this.cols; j++) {
            const col = this.map(row => row[j].conj());
            conjRows.push(new ComplexVector(...col));
        }
        return new ComplexMatrix(...conjRows);
    }
    toPrecision(precision) {
        const formatted = this.map(row => row.map(x => x.toPrecision(precision)));
        const maxLength = formatted.reduce((max, a) => Math.max(max, a.reduce((max, s) => Math.max(max, s.length), 0)), 0);
        const padded = formatted.map(row => row.map(s => s.padStart(maxLength)));
        return padded.map(row => (`| ${row.join(', ')} |`)).join('\n');
    }
}
