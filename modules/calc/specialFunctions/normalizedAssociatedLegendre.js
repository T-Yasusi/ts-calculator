import { add, sub, mul, div, neg } from '../operators.js';
import { abs, pow, sqrt } from '../functions.js';
export default function normalizedAssociatedLegendre(m, l, x) {
    if (!Number.isInteger(l) || !Number.isInteger(m))
        throw new Error('!!! asociatedLegendre(m, l, x)   l, m must be Interger !!!');
    if (l < 0)
        throw new Error('!!! asociatedLendre is not support l<0 !!!');
    const m2 = abs(m);
    if (m2 > l)
        return 0;
    if (l === 0 && m2 === 0)
        return div(1, sqrt(2));
    let a2 = 0;
    let a = div(add(mul(2, m2), 1), 2);
    for (let i = 1; i <= mul(2, m2); i++)
        a /= i;
    a = sqrt(a);
    for (let i = sub(mul(2, m2), 1); i > 0; i -= 2)
        a *= i;
    let a1 = mul(a, pow(sub(1, mul(x, x)), mul(0.5, m2)));
    if (m2 === l)
        return m2 === m ? a1 : mul(pow(neg(1), m2), a1);
    let a0 = mul(mul(sqrt(add(mul(2, m2), 3)), x), a1);
    for (let i = add(m2, 1); i < l; i++) {
        a2 = a1;
        a1 = a0;
        a0 = div(sub(mul(mul(sqrt(mul(add(mul(2, i), 1), add(mul(2, i), 3))), x), a1), mul(sqrt(div(mul(mul(add(mul(2, i), 3), add(i, m2)), sub(i, m2)), sub(mul(2, i), 1))), a2)), sqrt(mul(add(add(i, 1), m2), sub(add(i, 1), m2))));
    }
    return m2 === m ? a0 : mul(pow(neg(1), m2), a0);
}
