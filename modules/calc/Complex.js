export class Complex {
    re;
    im;
    constructor(re, im = 0) {
        this.re = re;
        this.im = im;
    }
    add(other) {
        if (typeof other === 'number') {
            return new Complex(this.re + other, this.im);
        }
        return new Complex(this.re + other.re, this.im + other.im);
    }
    sub(other) {
        if (typeof other === 'number') {
            return new Complex(this.re - other, this.im);
        }
        return new Complex(this.re - other.re, this.im - other.im);
    }
    mul(other) {
        if (typeof other === 'number') {
            return new Complex(this.re * other, this.im * other);
        }
        const re = this.re * other.re - this.im * other.im;
        const im = this.re * other.im + this.im * other.re;
        return new Complex(re, im);
    }
    div(other) {
        if (typeof other === 'number') {
            if (other === 0)
                throw new Error('Division by zero');
            return new Complex(this.re / other, this.im / other);
        }
        const denom = other.re ** 2 + other.im ** 2;
        if (denom === 0)
            throw new Error('Division by zero');
        const re = (this.re * other.re + this.im * other.im) / denom;
        const im = (this.im * other.re - this.re * other.im) / denom;
        return new Complex(re, im);
    }
    neg() {
        return new Complex(-this.re, -this.im);
    }
    conj() {
        return new Complex(this.re, -this.im);
    }
    abs() {
        return Math.hypot(this.re, this.im);
    }
    arg() {
        return Math.atan2(this.im, this.re);
    }
    equals(other) {
        return this.re === other.re && this.im === other.im;
    }
    toString() {
        if (this.im === 0)
            return `${this.re}`;
        if (this.re === 0)
            return `${this.im}i`;
        return `${this.re} ${this.im >= 0 ? '+' : '-'} ${Math.abs(this.im)}i`;
    }
}
