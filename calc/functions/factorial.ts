export default function factorial(n: number | bigint): number | bigint {
  if (typeof n === "number") {
    if (!Number.isInteger(n)) {
      throw new Error("階上は整数に対してのみ定義されます");
    }
    if (n < 0) {
      throw new Error("負の数の階上は定義されていません");
    }

    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;

  } else {
    if (n < 0n) {
      throw new Error("負の数の階上は定義されていません");
    }

    let result = 1n;
    for (let i = 2n; i <= n; i++) {
      result *= i;
    }
    return result;
  }
}