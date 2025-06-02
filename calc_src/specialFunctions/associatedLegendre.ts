import { Complex } from '../Complex.js';
import { add, sub, mul, div, mod, neg } from '../operators.js';
import { abs, pow } from '../functions.js';

type InputType = number | Complex;

export default function associatedLegendre(m: number, l: number, x: InputType): number | Complex {
    if( !Number.isInteger(l) || !Number.isInteger(m) ) throw new Error('!!! asociatedLegendre(m, l, x)   l, m must be Interger !!!');
    if( l<0 ) throw new Error('!!! asociatedLendre is not support l<0 !!!');

    const m2=abs(m) as number;
    if( m2>l ) return 0;
    if( m2===l && l===0 ) return 1;

    let a=1;
    for( let i=1; i<=2*m2-1; i+=2 ) a*=i;

    let a2=0;
    let a1=a * pow((1-x*x), 0.5*m2);
    if( m2===l ) return mul(parityFactor(l, m), a1);
    let a0 = (2*m2+1) * x *a1;

    for( let i=m2+1; i<l; i++ ){
        a2=a1;
        a1=a0;

        a0=((2*i+1) * x * a1 - (i+m2) * a2 )/(i-m2+1);
    }
    return parityFactor(l, m) * a0;

    return a0;
}

function parityFactor(l: number, m: number): number {
    if( m>=0 ) return 1;

    let deno=1;
    for( let i=l+m+1; i<=l-m; i++ ) deno*=i;

    if( m%2===0 ) return 1/deno;
    else return -1/deno;
}