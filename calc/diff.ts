import { Complex } from './Complex.js';
import forward from './diff/forward.js';
import central from './diff/central.js';
import backward from './diff/backward.js';

type RealFunction = (x: number) => number;
type ComplexFunction = (x: Complex) => Complex;

/**
 * 数値微分（実数または複素数）
 */
interface Diff {
  forward(
    f: RealFunction | ComplexFunction,
    x0: number | Complex,
    dx?: number | Complex
  ): number | Complex;

  central(
    f: RealFunction | ComplexFunction,
    x0: number | Complex,
    dx?: number | Complex
  ): number | Complex;

  backward(
    f: RealFunction | ComplexFunction,
    x0: number | Complex,
    dx?: number | Complex
  ): number | Complex;
}

// 実装をまとめて export
const diff: Diff = { forward, central, backward };
export default diff;