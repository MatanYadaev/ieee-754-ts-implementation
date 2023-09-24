import {describe, test, expect} from "bun:test";
import {toBinary, toDecimal} from "./double-precision-floating-point.ts";

describe('doublePrecisionFloatingPoint', () => {
    describe('toBinary', () => {
        test.each([
            [123, '0100000001011110110000000000000000000000000000000000000000000000'],
            [0, '0000000000000000000000000000000000000000000000000000000000000000'],
        ])('Positive integer', (decimal, expected) => {
            // Act
            const result = toBinary(decimal);

            // Assert
            expect(result).toBe(expected);
        });

        test.each([
            [-123, '1100000001011110110000000000000000000000000000000000000000000000'],
            [-0, '1000000000000000000000000000000000000000000000000000000000000000'],
        ])('Negative integer', (decimal, expected) => {
            // Act
            const result = toBinary(decimal);

            // Assert
            expect(result).toBe(expected);
        })

        test.each([
            [123.456, '0100000001011110110111010010111100011010100111111011111001110111'],
        ])('Positive decimal', (decimal, expected) => {
            // Act
            const result = toBinary(decimal);

            // Assert
            expect(result).toBe(expected);
        })

        test.each([
            [-123.456, '1100000001011110110111010010111100011010100111111011111001110111'],
        ])('Negative decimal', (decimal, expected) => {
            // Act
            const result = toBinary(decimal);

            // Assert
            expect(result).toBe(expected);
        })

        test.each([
            [Number.POSITIVE_INFINITY, '0111111111110000000000000000000000000000000000000000000000000000'],
            [Number.NEGATIVE_INFINITY, '1111111111110000000000000000000000000000000000000000000000000000'],
            [Number.NaN, '0111111111111000000000000000000000000000000000000000000000000000'],
        ])('Special values', (decimal, expected) => {
            // Act
            const result = toBinary(decimal);

            // Assert
            expect(result).toBe(expected);
        })
    });

    describe('toDecimal', () => {
        test.each([
            ['0100000001011110110000000000000000000000000000000000000000000000', 123],
            ['0000000000000000000000000000000000000000000000000000000000000000', 0],
        ])('Positive integer', (binary, expected) => {
            // Act
            const result = toDecimal(binary);

            // Assert
            expect(result).toBe(expected);
        });

        test.each([
            ['1100000001011110110000000000000000000000000000000000000000000000', -123],
            ['1000000000000000000000000000000000000000000000000000000000000000', -0],
        ])('Negative integer', (binary, expected) => {
            // Act
            const result = toDecimal(binary);

            // Assert
            expect(result).toBe(expected);
        });

        test.each([
            ['0100000001011110110111010010111100011010100111111011111001110111', 123.456],
        ])('Positive decimal', (binary, expected) => {
            // Act
            const result = toDecimal(binary);

            // Assert
            expect(result).toBe(expected);
        })

        test.each([
            ['1100000001011110110111010010111100011010100111111011111001110111', -123.456],
        ])('Negative decimal', (binary, expected) => {
            // Act
            const result = toDecimal(binary);

            // Assert
            expect(result).toBe(expected);
        })

        test.each([
            ['0111111111110000000000000000000000000000000000000000000000000000', Number.POSITIVE_INFINITY],
            ['1111111111110000000000000000000000000000000000000000000000000000', Number.NEGATIVE_INFINITY],
            ['0111111111111000000000000000000000000000000000000000000000000000', Number.NaN],
            ['1111111111111000000000000000000000000000000000000000000000000000', Number.NaN],
        ])('Special values', (binary, expected) => {
            // Act
            const result = toDecimal(binary);

            // Assert
            expect(result).toBe(expected);
        })
    });
});