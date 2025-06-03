export function toFormattedString(x: number, effDigits: number): string {
  const abs = Math.abs(x);
  let str: string;

  const useScientific = (abs >= 1e3 || (abs > 0 && abs < 1e-3));

  if (x === 0) {
    str = '0'.padStart(effDigits, '0'); // ゼロは固定長0で埋める
  } else if (useScientific) {
    str = x.toExponential(effDigits - 1);
  } else {
    const digitsBefore = Math.floor(Math.log10(abs)) + 1;
    const fractionDigits = Math.max(effDigits - digitsBefore, 0);
    str = x.toFixed(fractionDigits);
  }

  if (x >= 0) str = ' ' + str;

  return str;
}