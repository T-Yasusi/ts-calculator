import { Complex } from '../Complex.js';
import { sub, div } from '../operators.js';
export default function forward(f, x0, dx) {
    if (typeof x0 === 'number') {
        const delta = typeof dx === 'number' ? dx : 1.0e-8;
        return div(sub(f(x0), f(sub(x0, delta))), delta);
    }
    if (x0 instanceof Complex) {
        const delta = dx instanceof Complex ? dx : new Complex(1.0e-8, 0);
        return div(sub(f(x0), f(sub(x0, delta))), delta);
    }
    throw new Error('Invalid input');
}
