import { Complex } from './Complex.js';
import { add, sub } from './operators.js';
export default class ComplexVector extends Array {
    constructor(...elements) {
        super(...elements);
        Object.setPrototypeOf(this, ComplexVector.prototype);
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
    equals(other) {
        if (this.length !== other.length)
            throw new Error('Vectors must be the same length');
        return this.every((z, i) => z.equals(other[i]));
    }
    conj() { return new ComplexVector(...this.map(z => z.conj())); }
}
