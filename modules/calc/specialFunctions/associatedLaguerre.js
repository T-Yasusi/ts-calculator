import { add, sub, mul, div } from '../operators.js';
export default function associatedLaguerre(m, n, x) {
    if (n < 0)
        throw new Error('!!! associatedLaguerre not suport n<0 !!!');
    if (m < 0)
        throw new Error('!!! associatedLaguerre not suport m<0 !!!');
    if (n < m) {
        console.log('associatedLaguerre n<m  return 0;');
        return 0;
    }
    if (m === 0 && n === 0)
        return 1;
    let a0 = 1;
    let a1 = sub(add(1, m), x);
    if (n === 1)
        return a1;
    let a2 = div(sub(mul(sub(add(m, 3), x), a1), mul(add(m, 1), a0)), 2);
    for (let i = 2; i < n; i++) {
        a0 = a1;
        a1 = a2;
        a2 = div(sub(mul(sub(sub(add(add(mul(2, i), 1), m), x)), a1), mul(add(i, m), a0)), add(i, 1));
    }
    return a2;
}
