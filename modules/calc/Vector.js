export default class Vector extends Array {
    constructor(...elements) {
        super(...elements);
        //    Object.setPrototypeOf(this, Vector.prototype); // 必須
    }
    norm() {
        return Math.sqrt(this.reduce((sum, x) => sum + x * x, 0));
    }
    normalize() {
        const n = this.norm();
        if (n === 0)
            throw new Error('Cannot normalize zero vector');
        return this.scale(1 / n);
    }
    add(other) {
        if (this.length !== other.length) {
            throw new Error('Vectors must be the same length');
        }
        return new Vector(...this.map((x, i) => x + other[i]));
    }
    sub(other) {
        if (this.length !== other.length) {
            throw new Error('Vectors must be the same length');
        }
        return new Vector(...this.map((x, i) => x - other[i]));
    }
    scale(scalar) {
        return new Vector(...this.map(x => x * scalar));
    }
    dot(other) {
        if (this.length !== other.length) {
            throw new Error('Vectors must be the same length');
        }
        return this.reduce((sum, x, i) => sum + x * other[i], 0);
    }
    div(scalar) {
        if (scalar === 0)
            throw new Error('Division by zero');
        return this.scale(1 / scalar);
    }
    equals(other) {
        if (this.length !== other.length)
            return false;
        return this.every((x, i) => x === other[i]);
    }
    // 汎用的なmul(): scalar ならスカラー倍、Vector なら内積
    mul(other) {
        if (typeof other === 'number') {
            return this.scale(other);
        }
        else if (other instanceof Vector) {
            return this.dot(other);
        }
        else {
            throw new Error('Invalid operand for mul: must be number or Vector');
        }
    }
}
