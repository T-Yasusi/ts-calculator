import { toFormattedPrecision } from './util/toFormattedPrecision.js'

export class Complex {
  public readonly re: number;
  public readonly im: number;

  constructor(re: number, im: number = 0) {
    this.re = re;
    this.im = im;
  }

  add(other: Complex | number): Complex {
    if (typeof other === 'number') {
      return new Complex(this.re + other, this.im);
    }
    return new Complex(this.re + other.re, this.im + other.im);
  }

  sub(other: Complex | number): Complex {
    if (typeof other === 'number') {
      return new Complex(this.re - other, this.im);
    }
    return new Complex(this.re - other.re, this.im - other.im);
  }

  mul(other: Complex | number): Complex {
    if (typeof other === 'number') {
      return new Complex(this.re * other, this.im * other);
    }
    const re = this.re * other.re - this.im * other.im;
    const im = this.re * other.im + this.im * other.re;
    return new Complex(re, im);
  }

  div(other: Complex | number): Complex {
    if (typeof other === 'number') {
      if (other === 0) throw new Error('Division by zero');
      return new Complex(this.re / other, this.im / other);
    }
    const denom = other.re ** 2 + other.im ** 2;
    if (denom === 0) throw new Error('Division by zero');
    const re = (this.re * other.re + this.im * other.im) / denom;
    const im = (this.im * other.re - this.re * other.im) / denom;
    return new Complex(re, im);
  }

  neg(): Complex {
    return new Complex(-this.re, -this.im);
  }

  conj(): Complex {
    return new Complex(this.re, -this.im);
  }

  abs(): number {
    return Math.hypot(this.re, this.im);
  }

  arg(): number {
    return Math.atan2(this.im, this.re);
  }
  
  equals(other: Complex): boolean {
    return this.re === other.re && this.im === other.im;
  }

  toPrecision(precision: number = 3): string {
    const reString = toFormattedPrecision(this.re, precision);
    const imString = toFormattedPrecision(this.im, precision);
    if( (reString.includes('e-') || this.re ==0 ) && (imString.includes('e-') || this.im===0) ) return '0';
    else if( (imString.includes('e-') || this.im===0) ) return reString;
    else if( (reString.includes('e-') || this.re===0) ) return imString + 'i';
    
    return this.im > 0 ? reString + ' + '+imString+'i' : reString + imString.replace('-', ' - ')+'i';
  }

}

