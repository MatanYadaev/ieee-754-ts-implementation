const EXPONENT_BIAS = 1023;

export const toBinary = (number: number): string => {
    if (number === Number.POSITIVE_INFINITY) {
        return '0111111111110000000000000000000000000000000000000000000000000000';
    }

    if (number === Number.NEGATIVE_INFINITY) {
        return '1111111111110000000000000000000000000000000000000000000000000000';
    }

    if (Number.isNaN(number)) {
        return '0111111111111000000000000000000000000000000000000000000000000000';
    }

    if (number === 0) {
        const sign = 1 / number === -Infinity ? '1' : '0';

        return sign + '000000000000000000000000000000000000000000000000000000000000000';
    }

    const sign = number < 0 ? '1' : '0';
    number = Math.abs(number);

    let exponent = Math.floor(Math.log2(number));
    let fraction = number / Math.pow(2, exponent) - 1;

    let exponentBinary = (exponent + EXPONENT_BIAS).toString(2).padStart(11, '0');

    let fractionBinary = '';
    for (let i = 0; i < 52 && fraction > 0; i++) {
        fraction *= 2;
        if (fraction >= 1) {
            fractionBinary += '1';
            fraction -= 1;
        } else {
            fractionBinary += '0';
        }
    }
    fractionBinary = fractionBinary.padEnd(52, '0');

    return sign + exponentBinary + fractionBinary;
};

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

    const exponent = parseInt(exponentBinary, 2) - EXPONENT_BIAS;

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