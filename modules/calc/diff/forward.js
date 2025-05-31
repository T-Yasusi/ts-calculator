import { Complex } from '../Complex.js';
import { add, sub, div } from '../operators.js';
export default function forward(f, x0, dx) {
    if (typeof x0 === 'number') {
        const delta = typeof dx === 'number' ? dx : 1.0e-8;
        return div(sub(f(add(x0, delta)), f(x0)), delta);
    }
    if (x0 instanceof Complex) {
        const delta = dx instanceof Complex ? dx : new Complex(1.0e-8, 0);
        return div(sub(f(add(x0, delta)), f(x0)), delta);
    }
    throw new Error('Invalid input');
}
