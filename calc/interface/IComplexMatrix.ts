import { Complex } from '../Complex.js';
import { IVector } from './IVector.js';
import { IComplexVector } from './IComplexVector.js';
import { IMatrix } from './IMatrix.js';

export interface IComplexMatrix extends Array<IComplexVector> {
  readonly rows: number;
  readonly cols: number;

  add(other: IComplexMatrix | IMatrix): IComplexMatrix;
  sub(other: IComplexMatrix | IMatrix): IComplexMatrix;
  
  mulScalar(scalar: number | Complex): IComplexMatrix;
  mulMatrix(other: IComplexMatrix | IMatrix): IComplexMatrix;
  mulVector(vector: IComplexVector | IVector): IComplexVector;
  
  mul(
    arg:
      | number
      | Complex
      | IVector
      | IComplexVector
      | IMatrix
      | IComplexMatrix
  ): IComplexMatrix | IComplexVector;
  
  transpose(): IComplexMatrix;
  toPrecision(precision: number): string;
}