export class Complex {
  public readonly re: number;
  public readonly im: number;

  constructor(re: number, im: number = 0) {
    this.re = re;
    this.im = im;
  }

  add(other: Complex): Complex {
    return new Complex(this.re + other.re, this.im + other.im);
  }

  sub(other: Complex): Complex {
    return new Complex(this.re - other.re, this.im - other.im);
  }

  mul(other: Complex): Complex {
    const re = this.re * other.re - this.im * other.im;
    const im = this.re * other.im + this.im * other.re;
    return new Complex(re, im);
  }

  div(other: Complex): Complex {
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

  equals(other: Complex): boolean {
    return this.re === other.re && this.im === other.im;
  }

  toString(): string {
    if (this.im === 0) return `${this.re}`;
    if (this.re === 0) return `${this.im}i`;
    return `${this.re} ${this.im >= 0 ? '+' : '-'} ${Math.abs(this.im)}i`;
  }
}

