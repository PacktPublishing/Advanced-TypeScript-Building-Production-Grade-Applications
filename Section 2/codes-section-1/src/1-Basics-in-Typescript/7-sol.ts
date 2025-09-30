// Define the type for our accumulator function: a callable function with a `reset` method.
export let accumulator: ((value: number) => number) & { reset: Function };

// Internal state for the accumulator.
let total = 0;

// Define the function that performs the accumulation.
function accumulatorFunction(value: number): number {
  total += value;
  return total;
}

// Attach the `reset` method directly to the function.
accumulatorFunction.reset = function (): void {
  total = 0;
  console.log("Accumulator has been reset.");
};

// Assign the function to our accumulator variable.
accumulator = accumulatorFunction;

// ✅ Valid usage: Add numbers and get the updated total.
console.log(accumulator(10)); // Outputs: 10
console.log(accumulator(5)); // Outputs: 15

// ✅ Valid usage: Reset the accumulator.
accumulator.reset(); // Outputs: "Accumulator has been reset."

// ❌ Error: `nonExistentMethod` does not exist on `accumulator`.
// @ts-expect-error
accumulator.nonExistentMethod();

// ❌ Error: Cannot assign a string to `accumulator`.
// @ts-expect-error
accumulator = "Hello";
