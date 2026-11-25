// Supports addition, subtraction, multiplication, division, modulo, exponentiation, and square roots.

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

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Cannot modulo by zero.');
  }
  return a % b;
}

function exponentiate(a, b) {
  return a ** b;
}

function squareRoot(value) {
  if (value < 0) {
    throw new Error('Cannot calculate the square root of a negative number.');
  }
  return Math.sqrt(value);
}

module.exports = { add, subtract, multiply, divide, modulo, exponentiate, squareRoot };

if (require.main === module) {
  const operations = { add, subtract, multiply, divide, modulo, exponentiate, squareRoot };
  const args = process.argv.slice(2);
  const usage = 'Usage: node src/calculator.js <add|subtract|multiply|divide|modulo|exponentiate> <number> <number>\n       node src/calculator.js <squareRoot> <number>';

  if (args.length === 1 && (args[0] === '--help' || args[0] === '-h')) {
    console.log(usage);
  } else {
    try {
      const [operation, ...operands] = args;
      const expectedOperandCount = operation === 'squareRoot' ? 1 : 2;
      if (!Object.hasOwn(operations, operation) || operands.length !== expectedOperandCount) {
        throw new Error('Provide a supported operation and the required number of operands.');
      }

      const values = operands.map(Number);
      if (operands.some((operand) => !operand.trim()) || values.some((value) => !Number.isFinite(value))) {
        throw new Error('Both operands must be finite numbers.');
      }

      const result = operations[operation](...values);
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
