export default function swapCol(mat, i, j) {
    for (let k = 0; k < mat.cols; k++) {
        const temp = mat[i][k];
        mat[i][k] = mat[j][k];
        mat[j][k] = temp;
    }
}
