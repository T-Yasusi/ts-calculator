import { Matrix } from '../classes.js';
import { abs } from '../functions.js';
import { sub } from '../operators.js';
import isSymmetric from './isSymmetric.js';
export default function isHermite(mat, eps = 1.0e-8) {
    if (mat.cols !== mat.rows)
        return false;
    if (mat instanceof Matrix)
        return isSymmetric(mat, eps);
    let flag = true;
    for (let i = 0; i < mat.cols; i++) {
        for (let j = i + 1; i < mat.rows; j++) {
            if (abs(sub(mat[i][j], mat[j][i].conj())) > eps) {
                flag = false;
                break;
            }
        }
    }
    return flag;
}
