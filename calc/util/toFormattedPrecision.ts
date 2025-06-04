export function toFormattedPrecision(x: number, precision: number): string {
    if ( Math.abs(x) <10e-10 ) return'0';

    const str = x.toPrecision(precision);
    if (str.includes('e')) return str;
    if (str.length > precision + 3) return x.toExponential(precision-1);

    return str;
}