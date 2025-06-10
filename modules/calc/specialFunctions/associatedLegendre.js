import { add, sub, mul, div, mod, neg } from '../operators.js';
import { abs, pow } from '../functions.js';
export default function associatedLegendre(m, l, x) {
    if (!Number.isInteger(l) || !Number.isInteger(m))
        throw new Error('!!! asociatedLegendre(m, l, x)   l, m must be Interger !!!');
    if (l < 0)
        throw new Error('!!! asociatedLendre is not support l<0 !!!');
    const m2 = abs(m);
    if (m2 > l)
        return 0;
    if (m2 === l && l === 0)
        return 1;
    let a = 1;
    for (let i = 1; i <= sub(mul(2, m2), 1); i += 2)
        a *= i;
    let a2 = 0;
    let a1 = mul(a, pow(sub(1, mul(x, x)), mul(0.5, m2)));
    if (m2 === l)
        return mul(parityFactor(l, m), a1);
    let a0 = mul(mul(add(mul(2, m2), 1), x), a1);
    for (let i = add(m2, 1); i < l; i++) {
        a2 = a1;
        a1 = a0;
        a0 = div(sub(mul(mul(add(mul(2, i), 1), x), a1), mul(add(i, m2), a2)), add(sub(i, m2), 1));
    }
    return mul(parityFactor(l, m), a0);
    return a0;
}
function parityFactor(l, m) {
    if (m >= 0)
        return 1;
    let deno = 1;
    for (let i = add(add(l, m), 1); i <= sub(l, m); i++)
        deno *= i;
    if (mod(m, 2) === 0)
        return div(1, deno);
    else
        return div(neg(1), deno);
}
