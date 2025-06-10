import { Complex } from '../classes.js';
import { add, mul } from '../operators.js';
export default function eular(func, y0, x0, dx, nStep = 1000) {
    if (dx === undefined) {
        if (typeof x0 === 'number')
            dx = 1.0e-3;
        else if (x0 instanceof Complex)
            dx = new Complex(1.0e-3, 0);
        else
            throw new Error('!!! Unsupported x0 type for default dx !!!');
    }
    let y = y0, x = x0;
    const yarr = [y0];
    const xarr = [x0];
    for (let i = 0; i < nStep; i++) {
        y = add(y, mul(dx, func(y, x)));
        x = add(x, dx);
        yarr.push(y);
        xarr.push(x);
    }
    return {
        y: yarr,
        x: xarr
    };
}
