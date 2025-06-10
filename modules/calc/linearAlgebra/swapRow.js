export default function swapRow(mat, i, j) {
    const temp = mat[i];
    mat[i] = mat[j];
    mat[j] = temp;
}
