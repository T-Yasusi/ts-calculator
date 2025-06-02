import { Complex } from '../Complex.js';
import { add, sub, mul, div } from '../operators.js';
export default function legendre(n, x) {
    if (!Number.isInteger(n) || n < 0)
        throw new Error(`Expected a positive integer, but got ${n}`);
    if (n === 0)
        return 1;
    else if (n === 1)
        return x;
    else {
        let a0 = typeof x === 'number' ? 1 : new Complex(1, 0);
        let a1 = x;
        let a2 = div(sub(mul(mul(3, x), a1), a0), 2);
        for (let i = 2; i < n; i++) {
            a0 = a1;
            a1 = a2;
            a2 = div(sub(mul(mul(add(mul(2, i), 1), x), a1), mul(i, a0)), add(i, 1));
        }
        return a2;
    }
    throw new Error(add('!!! sin invalid type !!! ', typeof x));
}
