const { add, subtract, multiply, divide, modulo, exponentiate, squareRoot } = require('../calculator');

describe('addition', () => {
  test.each([
    [2, 3, 5],
    [-2, -3, -5],
    [-2, 3, 1],
    [7, -7, 0],
    [0, 5, 5],
    [5, 0, 5],
    [0, 0, 0],
  ])('add(%s, %s) returns %s', (a, b, expected) => {
    expect(add(a, b)).toBe(expected);
  });

  test.each([
    [0.1, 0.2, 0.3],
    [-1.25, 0.5, -0.75],
    [2, 0.75, 2.75],
  ])('add(%s, %s) handles floating-point numbers', (a, b, expected) => {
    expect(add(a, b)).toBeCloseTo(expected, 10);
  });
});

describe('subtraction', () => {
  test.each([
    [10, 4, 6],
    [4, 10, -6],
    [-10, -4, -6],
    [10, -4, 14],
    [5, 5, 0],
    [0, 5, -5],
    [5, 0, 5],
    [0, 0, 0],
  ])('subtract(%s, %s) returns %s', (a, b, expected) => {
    expect(subtract(a, b)).toBe(expected);
  });

  test.each([
    [0.3, 0.1, 0.2],
    [-1.25, 0.5, -1.75],
    [2, 0.75, 1.25],
  ])('subtract(%s, %s) handles floating-point numbers', (a, b, expected) => {
    expect(subtract(a, b)).toBeCloseTo(expected, 10);
  });
});

describe('multiplication', () => {
  test.each([
    [45, 2, 90],
    [-5, 3, -15],
    [5, -3, -15],
    [-5, -3, 15],
    [0, 5, 0],
    [5, 0, 0],
    [0, 0, 0],
    [7, 1, 7],
  ])('multiply(%s, %s) returns %s', (a, b, expected) => {
    expect(multiply(a, b)).toBe(expected);
  });

  test.each([
    [0.1, 0.2, 0.02],
    [-1.25, 0.5, -0.625],
    [2, 0.75, 1.5],
  ])('multiply(%s, %s) handles floating-point numbers', (a, b, expected) => {
    expect(multiply(a, b)).toBeCloseTo(expected, 10);
  });
});

describe('division', () => {
  test.each([
    [20, 5, 4],
    [-20, 5, -4],
    [20, -5, -4],
    [-20, -5, 4],
    [0, 5, 0],
    [7, 1, 7],
    [7, 7, 1],
    [1, 4, 0.25],
  ])('divide(%s, %s) returns %s', (a, b, expected) => {
    expect(divide(a, b)).toBe(expected);
  });

  test.each([
    [0.3, 0.1, 3],
    [-1.25, 0.5, -2.5],
    [1, 3, 0.3333333333333333],
    [2, 0.5, 4],
  ])('divide(%s, %s) handles floating-point numbers', (a, b, expected) => {
    expect(divide(a, b)).toBeCloseTo(expected, 10);
  });

  test.each([
    [5, 0],
    [-5, 0],
    [0, 0],
    [5, -0],
  ])('divide(%s, %s) rejects division by zero', (a, b) => {
    expect(() => divide(a, b)).toThrow('Cannot divide by zero.');
  });
});

describe('modulo', () => {
  test.each([
    [10, 3, 1],
    [-10, 3, -1],
    [10, -3, 1],
    [9, 3, 0],
    [0, 5, 0],
  ])('modulo(%s, %s) returns %s', (a, b, expected) => {
    expect(modulo(a, b)).toBe(expected);
  });

  test('modulo handles floating-point numbers', () => {
    expect(modulo(5.5, 2)).toBeCloseTo(1.5, 10);
  });

  test.each([0, -0])('modulo rejects a zero divisor', (divisor) => {
    expect(() => modulo(5, divisor)).toThrow('Cannot modulo by zero.');
  });
});

describe('exponentiation', () => {
  test.each([
    [2, 3, 8],
    [-2, 3, -8],
    [2, -2, 0.25],
    [9, 0.5, 3],
    [0, 0, 1],
  ])('exponentiate(%s, %s) returns %s', (base, exponent, expected) => {
    expect(exponentiate(base, exponent)).toBe(expected);
  });

  test('exponentiate handles floating-point results', () => {
    expect(exponentiate(2, 0.5)).toBeCloseTo(Math.sqrt(2), 10);
  });
});

describe('square root', () => {
  test.each([
    [0, 0],
    [1, 1],
    [9, 3],
    [0.25, 0.5],
  ])('squareRoot(%s) returns %s', (value, expected) => {
    expect(squareRoot(value)).toBe(expected);
  });

  test('squareRoot handles floating-point results', () => {
    expect(squareRoot(2)).toBeCloseTo(Math.sqrt(2), 10);
  });

  test.each([-1, -0.25])('squareRoot rejects negative values', (value) => {
    expect(() => squareRoot(value)).toThrow('Cannot calculate the square root of a negative number.');
  });
});
