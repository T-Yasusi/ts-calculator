import { Complex } from '../Complex.js'

/**
 * 数値微分（実数または複素数）
 */
export interface Diff {
  forward(
    f: ((x: number)=> number) | ((x: Complex)=> Complex),
    x0: number | Complex,
    dx?: number | Complex
  ): number | Complex;

  central(
    f: ((x: number)=> number) | ((x: Complex)=> Complex),
    x0: number | Complex,
    dx?: number | Complex
  ): number | Complex;

  backward(
    f: ((x: number)=> number) | ((x: Complex)=> Complex),
    x0: number | Complex,
    dx?: number | Complex
  ): number | Complex;
}