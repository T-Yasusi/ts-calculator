import { Complex } from './Complex.js';
import Vector from './Vector.js';
import { add, sub, mul, div } from './operators.js'

export default class ComplexVector extends Array<Complex> {
  constructor(...elements: Complex[]) {
    super(...elements);
    Object.setPrototypeOf(this, ComplexVector.prototype);
  }
  
  add(other: ComplexVector | Vector): ComplexVector {
    if (this.length !== other.length) throw new Error('Vectors must be the same length');
    return new ComplexVector(...this.map((z, i) => add(z, other[i])));
  }

  sub(other: ComplexVector | Vector): ComplexVector {
    if (this.length !== other.length) throw new Error('Vectors must be the same length');
    return new ComplexVector(...this.map((z, i) => sub(z, other[i])));
  }

  scale(scalar: number | Complex): ComplexVector {
    const s = typeof scalar === 'number' ? new Complex(scalar, 0) : scalar;
    return new ComplexVector(...this.map(z => z.mul(s)));
  }

  div(scalar: number | Complex): ComplexVector {
    const s = typeof scalar === 'number' ? new Complex(scalar, 0) : scalar;
    return new ComplexVector(...this.map(z => z.div(s)));
  }

  dot(other: ComplexVector | Vector): Complex {
    if (this.length !== other.length) throw new Error('Vectors must be the same length');
    return this.reduce((sum, z, i) => sum.add(z.conj().mul(other[i])), new Complex(0, 0));
  }

  equals(other: ComplexVector): boolean {
    if (this.length !== other.length) throw new Error('Vectors must be the same length');
    return this.every((z, i) => z.equals(other[i]));
  }

  conj(): ComplexVector { return new ComplexVector(...this.map(z => z.conj())); }
}
