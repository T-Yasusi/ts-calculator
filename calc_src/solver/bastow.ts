import { Complex } from '../Complex.js';
import { add, sub, mul, div, neg, mod } from '../operators.js';
import { abs, sqrt } from '../functions.js'

const MAX_LOOP=1000000;

export default function(cofficients: number[] | Complex [], thre: number=10e-10 ): Complex[] {
    const result = [];
    while( cofficients.length>3 ){
        const [ coffs, ans ] = step(cofficients, thre);
        cofficients = coffs;
        result.push(...ans);
    }   

//    console.log(cofficients.length);
    if( cofficients.length === 2 ){
        if( cofficients[1] instanceof Complex ) result.push(-cofficients[1]/cofficients[0]);
        else result.push(new Complex(-cofficients[1]/cofficients[0], 0));
    }
    else if( cofficients.length === 3 ){
        const D = sqrt(cofficients[1]*cofficients[1] - 4*cofficients[0]*cofficients[2]);
        if( D instanceof Complex ){
            result.push( (-cofficients[1]+D)/(2*cofficients[0]), (-cofficients[1]-D)/(2*cofficients[0]));
        }
        else {
            result.push( new Complex((-cofficients[1]+D)/(2*cofficients[0]), 0), 
                         new Complex((-cofficients[1]-D)/(2*cofficients[0]), 0));
        }
    }
    return result;
} 

function step(coffs: number[] | Complex[], thre: number=10e-10){
    if( abs(coffs[0])>0 ) for( let i=coffs.length-1; i>=0; i-- ) coffs[i] = coffs[i] / coffs[0];
    let p = 1;
    let q = 1;

    const b = [ 1, coffs[1]-p ];
    for( let i=2; i<coffs.length; i++ ) b.push(coffs[i] - p*b[i-1] - q*b[i-1]);

    const c = [ 1, b[1]-p ];
    for( let i=2; i<coffs.length; i++ ) c.push(b[i] - p*c[i-1] - q*c[i-2]);

    let counter=0;
    while( true ){
        counter++;
        const R = c[c.length-3] * c[c.length-3] - c[c.length-4] * (c[c.length-2] - b[b.length-2]);
        const dp = ( b[b.length-2] * c[c.length-3] - b[b.length-1] * c[c.length-4] ) / R;
        const dq = ( b[b.length-1] * c[c.length-3] - b[b.length-2] * ( c[c.length-2] - b[b.length-2] )) / R;

        p = p + dp;
        q = q + dq;

        // *** For iteration check
 //       if( counter%50===0 ) console.log('bastow.step', coffs, dp, dq);

        b[1] = coffs[1]-p;
        for( let i=2; i<coffs.length; i++ ) b[i] = coffs[i] - p * b[i-1]-q * b[i-2];

        c[1] = b[1]-p;
        for( let i=2; i<coffs.length; i++ ) c[i] = b[i] - p * c[i-1] - q * c[i-2];

        if( abs(dp)<thre && abs(dq)<thre ) break;
        if( counter>MAX_LOOP ) 
            throw new Error(`!!! solver.bastow loop over ${MAX_LOOP} dp = ${abs(dp)} dq = ${abs(dq)} !!!`);
    }
    const D = sqrt(p*p-4*q);
    const ans = D instanceof Complex ? [ (-p+D)/2, (-p-D)/2 ] : [ new Complex((-p+D)/2, 0), new Complex((-p-D)/2, 0) ];

    const new_coffs=[];
    for( let i=0; i<b.length-2; i++ ) new_coffs.push(b[i]);

    return [ new_coffs, ans ];
}