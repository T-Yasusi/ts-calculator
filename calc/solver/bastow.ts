import { Complex } from '../Complex.js';
import { add, sub, mul, div, neg, mod } from '../operators.js';
import { abs, sqrt } from '../functions.js';
const MAX_LOOP = 1000;
export default function (cofficients: number[] | Complex[], thre: number = 10e-10): Complex[] {
  console.log(cofficients);
  const result = [];
  while (cofficients.length > 3) {
    const [coffs, ans] = step(cofficients, thre);
    cofficients = coffs;
    console.log('Answer :', ans);
    result.push(...ans);
  }
  console.log(cofficients.length);
  if (cofficients.length === 2) {
    if (cofficients[1] instanceof Complex) result.push(div(neg(cofficients[1]), cofficients[0]));else result.push(new Complex(div(neg(cofficients[1]), cofficients[0]), 0));
  } else if (cofficients.length === 3) {
    const D = sqrt(sub(mul(cofficients[1], cofficients[1]), mul(mul(4, cofficients[0]), cofficients[2])));
    if (D instanceof Complex) {
      result.push(div(add(neg(cofficients[1]), D), mul(2, cofficients[0])), div(sub(neg(cofficients[1]), D), mul(2, cofficients[0])));
    } else {
      result.push(new Complex(div(add(neg(cofficients[1]), D), mul(2, cofficients[0])), 0), new Complex(div(sub(neg(cofficients[1]), D), mul(2, cofficients[0])), 0));
    }
  }
  return result;
}
function step(coffs: number[] | Complex[], thre: number = 10e-10) {
  if (abs(coffs[0]) > 0) for (let i = sub(coffs.length, 1); i >= 0; i--) coffs[i] = div(coffs[i], coffs[0]);
  let p = 1;
  let q = 1;
  const b = [1, sub(coffs[1], p)];
  for (let i = 2; i < coffs.length; i++) b.push(sub(sub(coffs[i], mul(p, b[sub(i, 1)])), mul(q, b[sub(i, 1)])));
  const c = [1, sub(b[1], p)];
  for (let i = 2; i < coffs.length; i++) c.push(sub(sub(b[i], mul(p, c[sub(i, 1)])), mul(q, c[sub(i, 2)])));
  let counter = 0;
  while (true) {
    counter++;
    const R = sub(mul(c[sub(c.length, 3)], c[sub(c.length, 3)]), mul(c[sub(c.length, 4)], sub(c[sub(c.length, 2)], b[sub(b.length, 2)])));
    const dp = div(sub(mul(b[sub(b.length, 2)], c[sub(c.length, 3)]), mul(b[sub(b.length, 1)], c[sub(c.length, 4)])), R);
    const dq = div(sub(mul(b[sub(b.length, 1)], c[sub(c.length, 3)]), mul(b[sub(b.length, 2)], sub(c[sub(c.length, 2)], b[sub(b.length, 2)]))), R);
    p = add(p, dp);
    q = add(q, dq);

    // *** For iteration check
    if (mod(counter, 50) === 0) console.log('bastow.step', coffs, dp, dq);
    b[1] = sub(coffs[1], p);
    for (let i = 2; i < coffs.length; i++) b[i] = sub(sub(coffs[i], mul(p, b[sub(i, 1)])), mul(q, b[sub(i, 2)]));
    c[1] = sub(b[1], p);
    for (let i = 2; i < coffs.length; i++) c[i] = sub(sub(b[i], mul(p, c[sub(i, 1)])), mul(q, c[sub(i, 2)]));
    if (abs(dp) < thre && abs(dq) < thre) break;
    if (counter > MAX_LOOP) throw new Error(`!!! solver.bastow loop over ${MAX_LOOP} dp = ${abs(dp)} dq = ${abs(dq)} !!!`);
  }
  const D = sqrt(sub(mul(p, p), mul(4, q)));
  console.log(p, q, D);
  const ans = D instanceof Complex ? [div(add(neg(p), D), 2), div(sub(neg(p), D), 2)] : [new Complex(div(add(neg(p), D), 2), 0), new Complex(div(sub(neg(p), D), 2), 0)];
  const new_coffs = [];
  for (let i = 0; i < sub(b.length, 2); i++) new_coffs.push(b[i]);
  return [new_coffs, ans];
}