import { Complex } from './Complex';
export class ComplexVector extends Array {
    constructor(elements) {
        super(...elements);
        Object.setPrototypeOf(this, ComplexVector.prototype);
    }
    static fromReIm(re, im) {
        throw new Error("Not yet implemented");
    }
    add(other) {
        this._checkLength(other);
        return new ComplexVector(this.map((z, i) => z.add(other[i])));
    }
    sub(other) {
        this._checkLength(other);
        return new ComplexVector(this.map((z, i) => z.sub(other[i])));
    }
    scale(scalar) {
        const s = typeof scalar === 'number' ? new Complex(scalar, 0) : scalar;
        return new ComplexVector(this.map(z => z.mul(s)));
    }
    div(scalar) {
        const s = typeof scalar === 'number' ? new Complex(scalar, 0) : scalar;
        return new ComplexVector(this.map(z => z.div(s)));
    }
    dot(other) {
        this._checkLength(other);
        return this.reduce((sum, z, i) => sum.add(z.mul(other[i].conj())), new Complex(0, 0));
    }
    equals(other) {
        this._checkLength(other);
        return this.every((z, i) => z.equals(other[i]));
    }
    conj() {
        return new ComplexVector(this.map(z => z.conj()));
    }
    _checkLength(other) {
        if (this.length !== other.length) {
            throw new Error('Vectors must be the same length');
        }
    }
}
