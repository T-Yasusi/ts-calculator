import { Complex } from './Complex.js';
import trapezoid from './integral/trapezoid.js'
import simpson from './integral/simpson.js'

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
}

const integral: Integral = { trapezoid, simpson };
export default integral;