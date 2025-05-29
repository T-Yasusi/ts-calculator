function add(a, b) {
    if (typeof a === 'undefined' || typeof b === 'undefined') {
        throw new Error(`Invalid arguments: undefined value`);
    }
    if (typeof a === 'number' && typeof b === 'number')
        return a + b;
    if (typeof a === 'bigint' && typeof b === 'bigint')
        return a + b;
    if (typeof a === 'string' && typeof b === 'string')
        return a + b;
    if (typeof a === 'object' && a !== null && typeof a.add === 'function')
        return a.add(b);
    if (typeof b === 'object' && b !== null && typeof b.add === 'function')
        return b.add(a);
    // 明示的に拒否する混在型（安全対策）
    throw new Error(`Invalid operand types: ${typeof a} + ${typeof b} — only (number+number), (bigint+bigint), (string+string), or .add() are allowed`);
}
export default function (...args) {
    if (args.length === 0)
        throw new Error('No arguments provided');
    if (args.length === 1)
        return args[0];
    return args.reduce((sum, val) => add(sum, val));
}
