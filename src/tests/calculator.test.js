const { add, subtract, multiply, divide } = require('../calculator');

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
