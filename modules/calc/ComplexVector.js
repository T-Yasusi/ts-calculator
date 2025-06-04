import { Complex } from './Complex.js';
import Vector from './Vector.js';
import Matrix from './Matrix.js';
import ComplexMatrix from './ComplexMatrix.js';
import { add, sub, mul } from './operators.js';
export default class ComplexVector extends Array {
    constructor(...elements) {
        if (elements.length === 1) {
            if (typeof elements[0] === 'number')
                super(...Array.from({ length: elements[0] }, () => new Complex(0, 0)));
            else if (Array.isArray(elements[0]))
                super(...elements[0]);
            else
                throw new Error('!!! Invalid argument for ComplexVector constructor !!!');
        }
        else
            super(...elements);
        Object.setPrototypeOf(this, ComplexVector.prototype); // 必須
    }
    norm() { return Math.sqrt(this.reduce((sum, a) => sum + a.abs(), 0)); }
    normalize() {
        const n = this.norm();
        if (n === 0)
            throw new Error('Cannot normalize zero vector');
        return this.scale(1 / n);
    }
    add(other) {
        if (this.length !== other.length)
            throw new Error('Vectors must be the same length');
        return new ComplexVector(...this.map((z, i) => add(z, other[i])));
    }
    sub(other) {
        if (this.length !== other.length)
            throw new Error('Vectors must be the same length');
        return new ComplexVector(...this.map((z, i) => sub(z, other[i])));
    }
    scale(scalar) {
        const s = typeof scalar === 'number' ? new Complex(scalar, 0) : scalar;
        return new ComplexVector(...this.map(z => z.mul(s)));
    }
    div(scalar) {
        const s = typeof scalar === 'number' ? new Complex(scalar, 0) : scalar;
        return new ComplexVector(...this.map(z => z.div(s)));
    }
    dot(other) {
        if (this.length !== other.length)
            throw new Error('Vectors must be the same length');
        return this.reduce((sum, z, i) => sum.add(z.conj().mul(other[i])), new Complex(0, 0));
    }
    dotMat(other) {
        if (this.length !== other.cols)
            throw new Error('Vector * Matrix not match size');
        const result = new Array(other.rows).fill(new Complex(0, 0));
        for (let i = 0; i < other.rows; i++) {
            for (let k = 0; k < this.length; k++)
                result[i] = add(result[i], mul(this[k].conj(), other[k][i]));
        }
        return new ComplexVector(...result);
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
    equals(other) {
        if (this.length !== other.length)
            throw new Error('Vectors must be the same length');
        return this.every((z, i) => z.equals(other[i]));
    }
    conj() { return new ComplexVector(...this.map(z => z.conj())); }
    toPrecision(precision = 3, isColumn = false) {
        const strs = this.map(x => x.toPrecision(precision));
        const maxLength = strs.reduce((max, s) => Math.max(max, s.length), 0);
        const padded = strs.map(s => s.padStart(maxLength));
        console.log(padded);
        if (isColumn)
            return `| ${padded.join(' |\n| ')} |`;
        else
            return `[ ${padded.join(', ')} ]`;
    }
}
