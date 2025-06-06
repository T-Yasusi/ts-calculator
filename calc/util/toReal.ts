import { Complex } from '../classes.js'
import { abs } from '../functions.js'

export default function toReal(a: number | Complex, threshold: number=1.0e-8 ): number | Complex {
    if( typeof a === 'number' ) return a;
    if( a instanceof Complex ){
        if( abs(a.im)<threshold ) return a.re;
        else return a;
    }
    throw new Error('!!! toReal Invaild type !!!')
}