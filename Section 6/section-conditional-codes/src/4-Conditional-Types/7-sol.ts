import { Equal, Expect } from "..";
/**
 * Utility type to extract a stock’s opening and closing prices.
 * If the provided list has at least two entries, it returns a tuple with
 * the first element (opening price) and the last element (closing price).
 * Otherwise, it returns `never`.
 */
type OpeningAndClosingPrices<T extends unknown[]> = T extends [
  infer Open,
  ...any[],
  infer Close
]
  ? [Open, Close]
  : never;

// Test cases to validate the OpeningAndClosingPrices utility type

// Test case 1: A schedule with multiple time checkpoints.
type schedule1 = OpeningAndClosingPrices<[9, 10, 11, 12]>;
type testCase1 = Expect<Equal<schedule1, [9, 12]>>;

// Test case 2: A schedule with a single time entry should return `never`.
type schedule2 = OpeningAndClosingPrices<[8]>;
type testCase2 = Expect<Equal<schedule2, never>>;

// Test case 3: An empty schedule should return `never`.
type schedule3 = OpeningAndClosingPrices<[]>;
type testCase3 = Expect<Equal<schedule3, never>>;
