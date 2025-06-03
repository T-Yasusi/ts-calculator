import { Complex } from '../Complex.js';
import { IVector } from './IVector.js';
import { IMatrix } from './IMatrix.js';
import { IComplexMatrix } from './IComplexMatrix.js'

export interface IComplexVector extends Array<Complex> {
  readonly length: number;

  norm(): number;
  normalize(): IComplexVector;

  add(other: IComplexVector | IVector): IComplexVector;
  sub(other: IComplexVector | IVector): IComplexVector;

  scale(scalar: number | Complex): IComplexVector;
  dot(other: IComplexVector | IVector): Complex;
  dotMat(other: IComplexMatrix | IMatrix): IComplexVector;
  
  div(scalar: number | Complex): IComplexVector;

  equals(other: IComplexVector): boolean;
  
  mul(
    other:
      | number
      | Complex
      | IVector
      | IComplexVector
      | IMatrix
      | IComplexMatrix
  ): Complex | IComplexVector;

  conj(): IComplexVector;

  toPrecision(precision?: number, isColumn?: boolean): string;
}