import { Equal, Expect } from "..";

/**
 * Utility type to filter a tuple by a given target type.
 * It iterates over a tuple and returns a new tuple including only elements
 * that are assignable to the specified Target type.
 */
type FilterTupleByType<Tuple, Target> = Tuple extends [
  infer First,
  ...infer Rest
]
  ? First extends Target
    ? [First, ...FilterTupleByType<Rest, Target>]
    : FilterTupleByType<Rest, Target>
  : [];

// Example 1: Extract numbers from a mixed tuple.
type configValues1 = FilterTupleByType<[1, 2, "invalid", 3, "skip"], number>;
type test1 = Expect<Equal<configValues1, [1, 2, 3]>>;

// Example 2: Extract strings from a mixed tuple.
type configValues2 = FilterTupleByType<
  ["host", 8080, "protocol", true, "path"],
  string
>;
type test2 = Expect<Equal<configValues2, ["host", "protocol", "path"]>>;

// Example 3: Extract objects from a mixed tuple.
// Note: In TypeScript, primitives (number, string, boolean) are assignable to {}.
type configValues3 = FilterTupleByType<
  ["env", null, 42, { mode: "prod" }, [], undefined],
  {}
>;
type test3 = Expect<Equal<configValues3, ["env", 42, { mode: "prod" }, []]>>;

/**
 * Real-World Scenario:
 *
 * In a TypeScript backend project, you might receive a tuple of configuration parameters
 * from various sources (environment variables, config files, etc.) that include different types.
 * For instance, you might need to filter out only the string values to validate that they meet
 * certain criteria (like checking that required environment variables are set). The `FilterTupleByType`
 * utility type helps you to extract just the string elements from such a heterogeneous tuple.
 */
