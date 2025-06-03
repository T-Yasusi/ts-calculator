export function toFormattedPrecision(x: number, precision: number): string {
    if (x === 0) return'0';

    const str = x.toPrecision(precision);
    if (str.includes('e')) return str;
    if (str.length > precision + 2) return x.toExponential(precision);

    return str;
}