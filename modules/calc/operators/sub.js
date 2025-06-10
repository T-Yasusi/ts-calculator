import neg from './neg.js';
function sub(a, b) {
    if (typeof a === 'undefined' || typeof b === 'undefined') {
        throw new Error(`Invalid arguments: undefined value `);
    }
    if (typeof a === 'number' && typeof b === 'number')
        return a - b;
    if (typeof a === 'bigint' && typeof b === 'bigint')
        return a - b;
    if (typeof a === 'string' && typeof b === 'string') {
        throw new Error('Subtraction not supported for strings');
    }
    if (typeof a === 'object' && a !== null && typeof a.sub === 'function')
        return a.sub(b);
    if (typeof b === 'object' && b !== null && typeof b.sub === 'function') {
        // -(b-a) として呼ぶ
        return neg(b.sub(a));
        //    throw new Error('Subtraction method found on second operand, but not used for safety');
    }
    throw new Error(`Invalid operand types: ${typeof a} - ${typeof b} — only (number-number), (bigint-bigint), or .sub() are allowed`);
}
export default function (...args) {
    if (args.length === 0)
        throw new Error('No arguments provided');
    if (args.length === 1)
        return args[0];
    return args.slice(1).reduce((diff, val) => sub(diff, val), args[0]);
}
