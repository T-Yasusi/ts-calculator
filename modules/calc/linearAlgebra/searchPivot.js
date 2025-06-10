import { abs } from '../functions.js';
export default function searchPivot(mat, i) {
    let max = abs(mat[i][i]);
    let pivot = i;
    for (let k = i; k < mat.cols; k++) {
        if (abs(mat[k][i]) > max) {
            max = abs(mat[k][i]);
            pivot = k;
        }
    }
    return pivot;
}
