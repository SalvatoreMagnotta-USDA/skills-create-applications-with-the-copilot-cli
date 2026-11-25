// Supports addition, subtraction, multiplication, division, modulo, powers, and square roots.

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero.');
  }
  return a / b;
}

function validateOperands(...operands) {
  if (!operands.every(Number.isFinite)) {
    throw new Error('Operands must be finite numbers.');
  }
}

function modulo(a, b) {
  validateOperands(a, b);
  if (b === 0) {
    throw new Error('Cannot calculate modulo by zero.');
  }
  // Use JavaScript remainder semantics: the result has the dividend's sign.
  return a % b;
}

function power(base, exponent) {
  validateOperands(base, exponent);
  const result = base ** exponent;
  if (Number.isNaN(result)) {
    throw new Error('Power must produce a real number.');
  }
  if (!Number.isFinite(result)) {
    throw new Error('Result is outside the supported numeric range.');
  }
  return result;
}

function sqrt(value) {
  validateOperands(value);
  if (value < 0) {
    throw new Error('Cannot calculate the square root of a negative number.');
  }
  return Math.sqrt(value);
}

module.exports = { add, subtract, multiply, divide, modulo, power, sqrt };

if (require.main === module) {
  const operations = module.exports;
  const args = process.argv.slice(2);
  const usage = [
    'Usage: node src/calculator.js <add|subtract|multiply|divide|modulo|power> <number> <number>',
    '       node src/calculator.js sqrt <number>',
  ].join('\n');

  if (args.length === 1 && (args[0] === '--help' || args[0] === '-h')) {
    console.log(usage);
  } else {
    try {
      const [operation, ...values] = args;
      if (!Object.hasOwn(operations, operation)) {
        throw new Error('Provide a supported operation.');
      }

      const operandCount = operation === 'sqrt' ? 1 : 2;
      if (values.length !== operandCount) {
        throw new Error(`${operation} requires ${operandCount} numeric operand(s).`);
      }

      const operands = values.map(Number);
      if (values.some(value => !value.trim()) || !operands.every(Number.isFinite)) {
        throw new Error('Operands must be finite numbers.');
      }

      const result = operations[operation](...operands);
      if (!Number.isFinite(result)) {
        throw new Error('Result is outside the supported numeric range.');
      }
      console.log(result);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      console.error(usage);
      process.exitCode = 1;
    }
  }
}
