const { spawnSync } = require('node:child_process');
const path = require('node:path');
const { add, subtract, multiply, divide, modulo, power, sqrt } = require('../calculator');

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
    [5, 2, 1],
    [10, 3, 1],
    [10, 5, 0],
    [0, 3, 0],
    [-10, 3, -1],
    [10, -3, 1],
    [5.5, 2, 1.5],
    [0.3, 0.2, 0.1],
  ])('modulo(%s, %s) returns approximately %s', (a, b, expected) => {
    expect(modulo(a, b)).toBeCloseTo(expected, 10);
  });

  test.each([0, -0])('rejects a zero divisor (%s)', divisor => {
    expect(() => modulo(5, divisor)).toThrow('Cannot calculate modulo by zero.');
  });
});

describe('exponentiation', () => {
  test.each([
    [2, 3, 8],
    [5, 0, 1],
    [0, 2, 0],
    [2, -2, 0.25],
    [-2, 3, -8],
    [-2, 2, 4],
    [9, 0.5, 3],
    [1.5, 2, 2.25],
  ])('power(%s, %s) returns approximately %s', (base, exponent, expected) => {
    expect(power(base, exponent)).toBeCloseTo(expected, 10);
  });

  test('rejects a negative base with a fractional exponent', () => {
    expect(() => power(-4, 0.5)).toThrow('Power must produce a real number.');
  });

  test.each([[0, -1], [10, 1000]])('rejects a non-finite result for power(%s, %s)', (base, exponent) => {
    expect(() => power(base, exponent)).toThrow('Result is outside the supported numeric range.');
  });
});

describe('square root', () => {
  test.each([
    [16, 4],
    [9, 3],
    [0, 0],
    [1, 1],
    [0.25, 0.5],
    [2, 1.4142135623730951],
  ])('sqrt(%s) returns approximately %s', (value, expected) => {
    expect(sqrt(value)).toBeCloseTo(expected, 10);
  });

  test.each([-1, -0.25])('rejects negative input %s', value => {
    expect(() => sqrt(value)).toThrow('Cannot calculate the square root of a negative number.');
  });
});

describe('new operation input validation', () => {
  test.each([NaN, Infinity, -Infinity, '2', null, undefined])('rejects invalid operand %s', value => {
    expect(() => modulo(value, 2)).toThrow('Operands must be finite numbers.');
    expect(() => modulo(2, value)).toThrow('Operands must be finite numbers.');
    expect(() => power(value, 2)).toThrow('Operands must be finite numbers.');
    expect(() => power(2, value)).toThrow('Operands must be finite numbers.');
    expect(() => sqrt(value)).toThrow('Operands must be finite numbers.');
  });
});

describe('calculator CLI', () => {
  const calculatorPath = path.join(__dirname, '..', 'calculator.js');
  const run = args => spawnSync(process.execPath, [calculatorPath, ...args], { encoding: 'utf8' });

  test.each([
    [['add', '2', '3'], '5'],
    [['subtract', '10', '4'], '6'],
    [['multiply', '45', '2'], '90'],
    [['divide', '20', '5'], '4'],
    [['modulo', '5', '2'], '1'],
    [['power', '2', '3'], '8'],
    [['sqrt', '16'], '4'],
    [['modulo', '5.5', '2'], '1.5'],
    [['power', '2', '-2'], '0.25'],
    [['sqrt', '0.25'], '0.5'],
  ])('runs %j successfully', (args, expected) => {
    const result = run(args);
    expect(result.status).toBe(0);
    expect(result.stdout.trim()).toBe(expected);
    expect(result.stderr).toBe('');
  });

  test.each([
    [['modulo', '5', '0'], 'Cannot calculate modulo by zero.'],
    [['power', '-4', '0.5'], 'Power must produce a real number.'],
    [['power', '10', '1000'], 'Result is outside the supported numeric range.'],
    [['sqrt', '-1'], 'Cannot calculate the square root of a negative number.'],
    [['sqrt'], 'sqrt requires 1 numeric operand(s).'],
    [['sqrt', '4', '9'], 'sqrt requires 1 numeric operand(s).'],
    [['power', '2'], 'power requires 2 numeric operand(s).'],
    [['modulo', '5', '2', '1'], 'modulo requires 2 numeric operand(s).'],
    [['sqrt', 'abc'], 'Operands must be finite numbers.'],
    [['sqrt', ' '], 'Operands must be finite numbers.'],
    [['sqrt', 'Infinity'], 'Operands must be finite numbers.'],
  ])('reports an error for %j', (args, message) => {
    const result = run(args);
    expect(result.status).toBe(1);
    expect(result.stdout).toBe('');
    expect(result.stderr).toContain(message);
    expect(result.stderr).toContain('Usage:');
  });

  test('help documents binary operations and unary square root', () => {
    const result = run(['--help']);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('modulo|power');
    expect(result.stdout).toContain('sqrt <number>');
    expect(result.stderr).toBe('');
  });
});
