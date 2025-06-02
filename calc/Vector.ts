import { Complex } from './Complex.js'
import ComplexVector from './ComplexVector.js'
import { add, sub, mul, div } from './operators.js'

export default class Vector extends Array<number> {
  constructor(...elements: Array<number>) {
    console.log('Vec Constructor : ', elements);
    super(...elements);
    Object.setPrototypeOf(this, Vector.prototype); // 必須
  }

  norm(): number {
    return Math.sqrt(this.reduce((sum, x) => sum + x * x, 0));
  }

  normalize(): Vector {
    const n = this.norm();
    if (n === 0) throw new Error('Cannot normalize zero vector');
    return (this.scale(1 / n) as Vector);
  }

  add(other: Vector | ComplexVector ): Vector | ComplexVector {
    console.log('Vector.add ', this, other);
    console.log(this.map);
    const result = this.map((x, i) => mul(x, other[i]));
    console.log('Check :', ...result);
    if (this.length !== other.length) throw new Error('Vectors must be the same length');
    if (other instanceof Vector ) return new Vector(...this.map((x, i) => x + other[i]));
    else if(other instanceof ComplexVector ) return new ComplexVector(...this.map((x, i) => add(x, other[i])));
    throw new Error('!!! Vector.add Invaild Type !!!');
  }

  sub(other: Vector | ComplexVector ): Vector | ComplexVector {
    if (this.length !== other.length) throw new Error('Vectors must be the same length');
    if (other instanceof Vector ) return new Vector(...this.map((x, i) => x - other[i]));
    else if(other instanceof ComplexVector ) return new ComplexVector(...this.map((x, i) => sub(x, other[i])));
    throw new Error('!!! Vector.add Invaild Type !!!');
  }

  scale(scalar: number | Complex): Vector | ComplexVector {
    if( typeof scalar === 'number' ) return new Vector(...this.map(x => x * scalar));
    else if(scalar instanceof Complex ) return new ComplexVector(...this.map(x => mul(x, scalar)));
    throw new Error('!!! Vector.add Invaild Type !!!');
  }

  dot(other: Vector | ComplexVector ): number | Complex {
    if (this.length !== other.length) throw new Error('Vectors must be the same length');
    if( other instanceof Vector ) return this.reduce((sum, x, i) => sum + x * other[i], 0);
    else if( other instanceof ComplexVector ) return this.reduce((sum, x, i) => add(sum, mul(x, other[i])), 0);
    throw new Error('!!! Vector.add Invaild Type !!!');
  }

  div(scalar: number | Complex ): Vector | ComplexVector{
    if( typeof scalar === 'number' && scalar === 0) throw new Error('Division by zero');
    else if( scalar instanceof Complex && scalar.abs() === 0) throw new Error('Division by zero');
    return this.scale(div(1, scalar));
  }

  equals(other: Vector): boolean {
    if (this.length !== other.length) return false;
    return this.every((x, i) => x === other[i]);
  }

  // 汎用的なmul(): scalar ならスカラー倍、Vector なら内積
  mul(other: number | Complex | Vector | ComplexVector ): Vector | ComplexVector | number | Complex {
    if (typeof other === 'number') {
      return this.scale(other);
    } else if (other instanceof Vector) {
      return this.dot(other);
    } else {
      throw new Error('Invalid operand for mul: must be number or Vector');
    }
  }
}
