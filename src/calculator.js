// Supports addition, subtraction, multiplication, and division.

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

module.exports = { add, subtract, multiply, divide };

if (require.main === module) {
  const operations = { add, subtract, multiply, divide };
  const args = process.argv.slice(2);
  const usage = 'Usage: node src/calculator.js <add|subtract|multiply|divide> <number> <number>';

  if (args.length === 1 && (args[0] === '--help' || args[0] === '-h')) {
    console.log(usage);
  } else {
    try {
      const [operation, first, second] = args;
      if (args.length !== 3 || !Object.hasOwn(operations, operation)) {
        throw new Error('Provide a supported operation and two numbers.');
      }

      const a = Number(first);
      const b = Number(second);
      if (!first.trim() || !second.trim() || !Number.isFinite(a) || !Number.isFinite(b)) {
        throw new Error('Both operands must be finite numbers.');
      }

      const result = operations[operation](a, b);
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
