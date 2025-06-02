import Vector from './Vector.js';
export default class Matrix extends Array {
    constructor(rows) {
        if (rows.length === 0) {
            throw new Error("Matrix must have at least one row.");
        }
        const width = rows[0].length;
        for (const row of rows) {
            if (row.length !== width) {
                throw new Error("All rows in the matrix must have the same length.");
            }
        }
        super(...rows);
    }
    static fromArray(array) {
        const vectors = array.map(row => new Vector(...row));
        return new Matrix(vectors);
    }
    get rows() {
        return this.length;
    }
    get cols() {
        return this[0].length;
    }
    add(other) {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            throw new Error("Matrix dimensions must match for addition.");
        }
        const result = this.map((row, i) => row.add(other[i]));
        return new Matrix(result);
    }
    sub(other) {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            throw new Error("Matrix dimensions must match for subtraction.");
        }
        const result = this.map((row, i) => row.sub(other[i]));
        return new Matrix(result);
    }
    mulScalar(scalar) {
        const result = this.map(row => row.mul(scalar));
        return new Matrix(result);
    }
    mulMatrix(other) {
        if (this.cols !== other.rows) {
            throw new Error("Matrix multiplication dimension mismatch.");
        }
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
        return new Matrix(result);
    }
    mulVector(vector) {
        if (this.cols !== vector.length) {
            throw new Error("Matrix-vector multiplication dimension mismatch.");
        }
        const result = this.map(row => row.dot(vector));
        return new Vector(...result);
    }
    mul(arg) {
        if (typeof arg === "number") {
            return this.mulScalar(arg);
        }
        else if (arg instanceof Vector) {
            return this.mulVector(arg);
        }
        else if (arg instanceof Matrix) {
            return this.mulMatrix(arg);
        }
        else {
            throw new Error("Unsupported type for Matrix multiplication.");
        }
    }
    transpose() {
        const transposedRows = [];
        for (let j = 0; j < this.cols; j++) {
            const col = this.map(row => row[j]);
            transposedRows.push(new Vector(...col));
        }
        return new Matrix(transposedRows);
    }
    toString() {
        return this.map(row => row.toString()).join('\n');
    }
}
