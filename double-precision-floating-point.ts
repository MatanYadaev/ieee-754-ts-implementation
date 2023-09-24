export const toDecimal = (binary: string): number => {
    if (binary.length !== 64) {
        throw new Error('Invalid binary string');
    }

    if (!binary.match(/^[01]+$/)) {
        throw new Error('Invalid binary string');
    }

    const sign = binary[0] === '1' ? -1 : 1;
    const exponentBinary = binary.slice(1, 12);
    const fractionBinary = binary.slice(12);

    const exponent = parseInt(exponentBinary, 2) - 1023;

    let fraction = exponent === -1023 ? 0 : 1;

    for (let i = 0; i < 52; i++) {
        fraction += parseInt(fractionBinary[i]) * (2 ** (-i - 1));
    }

    if (exponent === 1024 && fraction > 1) {
        return Number.NaN;
    }
    if (exponent === 1024 && fraction === 0) {
        return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    }
    if (exponent === -1023 && fraction === 0) {
        return sign === 1 ? 0 : -0;
    }

    return sign * fraction * (2 ** exponent);
};