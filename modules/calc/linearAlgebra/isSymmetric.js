import { abs } from '../functions.js';
import { sub } from '../operators.js';
export default function isSymmetric(mat, eps = 1.0e-8) {
    if (mat.cols !== mat.rows)
        return false;
    let flag = true;
    for (let i = 0; i < mat.cols; i++) {
        for (let j = i + 1; i < mat.rows; j++) {
            if (abs(sub(mat[i][j], mat[j][i])) > eps) {
                flag = false;
                break;
            }
        }
    }
    return flag;
}
