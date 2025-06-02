import { Complex } from '../Complex.js';
import { add, sub, mul, div, mod, neg } from '../operators.js';
import { abs, pow, sqrt } from '../functions.js';

type InputType = number | Complex;

export default function normalizedAssociatedLegendre(m: number, l: number, x: InputType): number | Complex {
    if( !Number.isInteger(l) || !Number.isInteger(m) ) throw new Error('!!! asociatedLegendre(m, l, x)   l, m must be Interger !!!');
    if( l<0 ) throw new Error('!!! asociatedLendre is not support l<0 !!!');

    const m2=abs(m) as number;
    if( m2>l ) return 0;
    if( m2===l && l===0 ) return 1;

    let a2=0;
    let a=(2*m2+1)/2;
    for( let i=1; i<=2*m2; i++ ) a/=i;
    a=sqrt(a);
    for( let i=2*m2-1; i>0; i-=2 ) a*=i;
    let a1=a*pow(1-x*x, 0.5*m2);

    if( m2===l ) return m2===m ? a1 : pow(-1, m2)*a1;
    let a0 = sqrt(2*m2+3)*x*a1;

    for( let i=m2+1; i<l; i++ ){
        a2 = a1;
        a1 = a0;
        a0 = (sqrt((2*i+1)*(2*i+3))*x*a1 - sqrt((2*i+3)*(i+m2)*(i-m2)/(2*i-1))*a2)/sqrt((i+1+m2)*(i+1-m2));
    }
    return m2 === m ? a0 : pow(-1, m2)*a0;
}