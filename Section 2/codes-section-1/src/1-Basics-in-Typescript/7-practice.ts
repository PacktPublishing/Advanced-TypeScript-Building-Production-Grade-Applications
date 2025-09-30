// Define the type for our accumulator function: a callable function with a `reset` method.
export let accumulator: TODO;

// Internal state for the accumulator.
let total = 0;

function accumulatorFunction(value: number): number {
  total += value;
  return total;
}

accumulatorFunction.reset = function (): void {
  total = 0;
  console.log("Accumulator has been reset.");
};

accumulator = accumulatorFunction;

// ✅ Valid usage: Add numbers and get the updated total.
console.log(accumulator(10)); // Outputs: 10
console.log(accumulator(5)); // Outputs: 15

// ✅ Valid usage: Reset the accumulator.
accumulator.reset(); // Outputs: "Accumulator has been reset."

// ❌ Error: `nonExistentMethod` does not exist on `accumulator`.
accumulator.nonExistentMethod();

// ❌ Error: Cannot assign a string to `accumulator`.
accumulator = "yohoooo!";
