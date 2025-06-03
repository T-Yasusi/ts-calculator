import { Complex } from '../Complex.js';
import { IVector } from './IVector.js';
import { IComplexVector } from './IComplexVector.js';
import { IComplexMatrix } from './IComplexMatrix.js';

export interface IMatrix extends Array<IVector> {
  readonly cols: number;
  readonly rows: number;

  add(other: IMatrix | IComplexMatrix): IMatrix | IComplexMatrix;
  sub(other: IMatrix | IComplexMatrix): IMatrix | IComplexMatrix;

  mulScalar(scalar: number | Complex): IMatrix | IComplexMatrix;
  mulMatrix(other: IMatrix | IComplexMatrix): IMatrix | IComplexMatrix;
  mulVector(vector: IVector | IComplexVector): IVector | IComplexVector;

  mul(
    arg:
      | number
      | Complex
      | IVector
      | IComplexVector
      | IMatrix
      | IComplexMatrix
  ): IMatrix | IComplexMatrix | IVector | IComplexVector;

  transpose(): IMatrix;
  toPrecision(precision: number): string;
}