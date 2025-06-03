import { Complex } from './Complex.js';
import Vector from './Vector.js';
import Matrix from './Matrix.js';
import { add, sub, mul, div } from './operators.js'

export default class ComplexVector extends Array<Complex> {
  constructor(...elements: [number] | Complex[]) {
    if( elements.length === 1 ){
      if( typeof elements[0] === 'number' ) super(...(new Array(elements[0]).fill(0)));
      else if( Array.isArray(elements[0]) ) super(...elements[0]);
      else throw new Error('!!! Invalid argument for ComplexVector constructor !!!')
    }
    else super(...(elements as Complex[]));
    Object.setPrototypeOf(this, ComplexVector.prototype); // 必須
  }
  
  norm() : number { return Math.sqrt(this.reduce((sum, a)=> sum+a.abs(), 0)); }

  normalize(): ComplexVector {
    const n = this.norm();
    if (n === 0) throw new Error('Cannot normalize zero vector');
    return (this.scale(1 / n) as ComplexVector);
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

  mul(other: number | Complex | Vector | ComplexVector ): Complex | ComplexVector {
    if (typeof other === 'number' || other instanceof Complex) {
      return this.scale(other);
    } else if (other instanceof Vector || other instanceof ComplexVector) {
      return this.dot(other);
    } else {
      throw new Error('Invalid operand for mul: must be number or Vector');
    }
  }

  equals(other: ComplexVector): boolean {
    if (this.length !== other.length) throw new Error('Vectors must be the same length');
    return this.every((z, i) => z.equals(other[i]));
  }

  conj(): ComplexVector { return new ComplexVector(...this.map(z => z.conj())); }
}
