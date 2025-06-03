import { Complex } from '../Complex.js';
import { IComplexVector } from './IComplexVector.js';
import { IMatrix } from './IMatrix.js';
import { IComplexMatrix } from './IComplexMatrix.js';

export interface IVector extends Array<number> {
  readonly length: number;

  norm(): number;
  normalize(): IVector;

  add(other: IVector | IComplexVector): IVector | IComplexVector;
  sub(other: IVector | IComplexVector): IVector | IComplexVector;
  
  scale(scalar: number | Complex): IVector | IComplexVector;
  dot(other: IVector | IComplexVector): number | Complex;
  dotMat(other: IMatrix | IComplexMatrix): IVector | IComplexVector;
  
  div(scalar: number | Complex): IVector | IComplexVector;

  equals(other: IVector): boolean;

  mul(
    other:
      | number
      | Complex
      | IVector
      | IComplexVector
      | IMatrix
      | IComplexMatrix
  ): IVector | IComplexVector | number | Complex;

  toPrecision(precision: number, isColumn?: boolean): string;
}