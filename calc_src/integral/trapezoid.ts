import { Complex } from '../Complex.js';
import { add, sub, mul, div } from '../operators.js';

export default function trapezoid(
    f: ((x: number) => number) | ((x: Complex) => Complex),
    x0: number | Complex,
    x1: number | Complex,
    N: number = 1000
): number | Complex {
    if (typeof x0 === 'number'){
        const dx = (x1 - x0)/N;
        let val=0;
        for(let i=0; i<N; i++) val = val + f(x0+i*dx) + f(x0+(i+1)*dx);
        return 0.5*dx*val;
    }
    if (x0 instanceof Complex){
        const dx = (x1-x0)/N;
        let val=new Complex(0, 0);
        for(let i=0; i<N; i++) val = val + f(x0+i*dx) + f(x0+(i+1)*dx);
        return 0.5*dx*val;      
    }
        
    throw new Error('Invalid input');
}

    