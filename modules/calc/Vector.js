// import { IVector } from './interface/IVector.js'
import { Complex } from './Complex.js';
import ComplexVector from './ComplexVector.js';
import Matrix from './Matrix.js';
import { add, sub, mul, div } from './operators.js';
import ComplexMatrix from './ComplexMatrix.js';
import { toFormattedPrecision } from './util/toFormattedPrecision.js';
export default class Vector extends Array {
    constructor(...elements) {
        if (elements.length === 1) {
            const elem = elements[0];
            if (typeof elem === 'number')
                super(...(new Array(elem).fill(0)));
            else if (Array.isArray(elem))
                super(...elem);
            else
                throw new Error('!!! Invalid argument for ComplexVector constructor !!!');
        }
        else
            super(...elements);
        Object.setPrototypeOf(this, Vector.prototype); // 必須
    }
    norm() { return Math.sqrt(this.reduce((sum, x) => sum + x * x, 0)); }
    abs2() { return this.reduce((sum, x) => sum + x * x, 0); }
    normalize() {
        const n = this.norm();
        if (n === 0)
            throw new Error('Cannot normalize zero vector');
        return this.scale(1 / n);
    }
    add(other) {
        const result = this.map((x, i) => mul(x, other[i]));
        if (this.length !== other.length)
            throw new Error('Vectors must be the same length');
        if (other instanceof Vector)
            return new Vector(...this.map((x, i) => x + other[i]));
        else if (other instanceof ComplexVector)
            return new ComplexVector(...this.map((x, i) => add(x, other[i])));
        throw new Error('!!! Vector.add Invaild Type !!!');
    }
    sub(other) {
        if (this.length !== other.length)
            throw new Error('Vectors must be the same length');
        if (other instanceof Vector)
            return new Vector(...this.map((x, i) => x - other[i]));
        else if (other instanceof ComplexVector)
            return new ComplexVector(...this.map((x, i) => sub(x, other[i])));
        throw new Error('!!! Vector.sub Invaild Type !!!');
    }
    scale(scalar) {
        if (typeof scalar === 'number')
            return new Vector(...this.map(x => x * scalar));
        else if (scalar instanceof Complex)
            return new ComplexVector(...this.map(x => mul(x, scalar)));
        throw new Error('!!! Vector.scale Invaild Type !!!');
    }
    dot(other) {
        if (this.length !== other.length)
            throw new Error('Vectors must be the same length');
        if (other instanceof Vector)
            return this.reduce((sum, x, i) => sum + x * other[i], 0);
        else if (other instanceof ComplexVector)
            return this.reduce((sum, x, i) => add(sum, mul(x, other[i])), 0);
        throw new Error('!!! Vector.dot Invaild Type !!!');
    }
    dotMat(other) {
        if (this.length !== other.cols)
            throw new Error('Vector * Matrix not match size');
        if (other instanceof Matrix) {
            const result = new Array(other.rows).fill(0);
            for (let i = 0; i < other.rows; i++) {
                for (let k = 0; k < this.length; k++)
                    result[i] += this[k] * other[k][i];
            }
            return new Vector(...result);
        }
        else if (other instanceof ComplexMatrix) {
            const result = new Array(other.rows).fill(new Complex(0, 0));
            for (let i = 0; i < other.rows; i++) {
                for (let k = 0; k < this.length; k++)
                    result[i] = add(result[i], mul(this[k], other[k][i]));
            }
            return new Vector(...result);
        }
        throw new Error('!!! Vector.dot Invaild Type !!!');
    }
    outerProduct(other) {
        const mat = other instanceof Vector ? new Matrix(this.length, other.length) : new ComplexMatrix(this.length, other.length);
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < other.length; j++) {
                mat[i][j] = mul(this[i], other[j]);
            }
        }
        return mat;
    }
    div(scalar) {
        if (typeof scalar === 'number' && scalar === 0)
            throw new Error('Division by zero');
        else if (scalar instanceof Complex && scalar.abs() === 0)
            throw new Error('Division by zero');
        return this.scale(div(1, scalar));
    }
    equals(other) {
        if (this.length !== other.length)
            return false;
        return this.every((x, i) => x === other[i]);
    }
    mul(other) {
        if (typeof other === 'number' || other instanceof Complex) {
            return this.scale(other);
        }
        else if (other instanceof Vector || other instanceof ComplexVector) {
            return this.dot(other);
        }
        else if (other instanceof Matrix || other instanceof ComplexMatrix) {
            return this.dotMat(other);
        }
        else {
            throw new Error('Invalid operand for mul: must be number or Vector');
        }
    }
    toPrecision(precision, isColumn = false) {
        const strs = this.map(x => toFormattedPrecision(x, precision));
        const maxLength = strs.reduce((max, s) => Math.max(max, s.length), 0);
        const padded = strs.map(s => s.padStart(maxLength));
        if (isColumn)
            return `| ${padded.join(' |\n| ')} |`;
        else
            return `[ ${padded.join(', ')} ]`;
    }
}
