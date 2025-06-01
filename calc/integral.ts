import { Complex } from './Complex.js';
import trapezoid from './integral/trapezoid.js'
import simpson from './integral/simpson.js'
import minusInfToInf from './integral/DE/minusInfToInf.js'
import zeroToInf from './integral/DE/zeroToInf.js'
import minusOneToOne from './integral/DE/minusOneToOne.js'

type RealFunction = (x: number) => number;
type ComplexFunction = (x: Complex) => Complex;

/**
 * 数値積分（実数または複素数）
 */
interface Integral {
    trapezoid(
        f: RealFunction | ComplexFunction,
        x0: number | Complex,
        x1: number | Complex,
        N: number
    ): number | Complex;

    simpson(
        f: RealFunction | ComplexFunction,
        x0: number | Complex,
        x1: number | Complex,
        N: number
    ): number | Complex;

    minusInfToInf(
        f: RealFunction | ComplexFunction,
        threshold: number
    ): number | Complex;

    zeroToInf(
        f: RealFunction | ComplexFunction,
        threshold: number
    ): number | Complex;

    minusOneToOne(
        f: RealFunction | ComplexFunction,
        threshold: number
    ): number | Complex;
}

const integral: Integral = { trapezoid, simpson, minusInfToInf, zeroToInf, minusOneToOne };
export default integral;