import { Complex } from '../Complex.js'

/**
 * 数値積分（実数または複素数）
 */
export interface Integral {
    trapezoid(
        f: ((x: number)=> number) | ((z: Complex)=> Complex),
        x0: number | Complex,
        x1: number | Complex,
        N: number
    ): number | Complex;

    simpson(
        f: ((x: number)=> number) | ((z: Complex)=> Complex),
        x0: number | Complex,
        x1: number | Complex,
        N: number
    ): number | Complex;

    minusInfToInf(
        f: ((x: number)=> number) | ((z: Complex)=> Complex),
        threshold: number
    ): number | Complex;

    zeroToInf(
        f: ((x: number)=> number) | ((z: Complex)=> Complex),
        threshold: number
    ): number | Complex;

    minusOneToOne(
        f: ((x: number)=> number) | ((z: Complex)=> Complex),
        threshold: number
    ): number | Complex;
}