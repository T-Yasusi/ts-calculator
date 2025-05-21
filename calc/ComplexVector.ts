import { Complex } from './Complex';

export class ComplexVector extends Array<Complex> {
  constructor(elements: Complex[]) {
    super(...elements);
    Object.setPrototypeOf(this, ComplexVector.prototype);
  }

  static fromReIm(re: number[], im?: number[]): ComplexVector {
    throw new Error("Not yet implemented");
  }
  
  add(other: ComplexVector): ComplexVector {
    this._checkLength(other);
    return new ComplexVector(this.map((z, i) => z.add(other[i])));
  }

  sub(other: ComplexVector): ComplexVector {
    this._checkLength(other);
    return new ComplexVector(this.map((z, i) => z.sub(other[i])));
  }

  scale(scalar: number | Complex): ComplexVector {
    const s = typeof scalar === 'number' ? new Complex(scalar, 0) : scalar;
    return new ComplexVector(this.map(z => z.mul(s)));
  }

  div(scalar: number | Complex): ComplexVector {
    const s = typeof scalar === 'number' ? new Complex(scalar, 0) : scalar;
    return new ComplexVector(this.map(z => z.div(s)));
  }

  dot(other: ComplexVector): Complex {
    this._checkLength(other);
    return this.reduce((sum, z, i) => sum.add(z.mul(other[i].conj())), new Complex(0, 0));
  }

  equals(other: ComplexVector): boolean {
    this._checkLength(other);
    return this.every((z, i) => z.equals(other[i]));
  }

  conj(): ComplexVector {
    return new ComplexVector(this.map(z => z.conj()));
  }

  private _checkLength(other: ComplexVector) {
    if (this.length !== other.length) {
      throw new Error('Vectors must be the same length');
    }
  }
}
