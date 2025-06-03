import { toFormattedPrecision } from './util/toFormattedPrecision.js';
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
    toPrecision(precision = 3) {
        const reString = toFormattedPrecision(this.re, precision);
        const imString = toFormattedPrecision(this.im, precision);
        if ((reString.includes('e-') || this.re == 0) && (imString.includes('e-') || this.im === 0))
            return '0';
        else if ((imString.includes('e-') || this.im === 0))
            return reString;
        else if ((reString.includes('e-') || this.re === 0))
            return imString + 'i';
        return this.im > 0 ? reString + ' + ' + imString + 'i' : reString + imString.replace('-', ' - ') + 'i';
    }
}
