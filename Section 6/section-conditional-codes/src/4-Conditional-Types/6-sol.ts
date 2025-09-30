import { Equal, Expect } from "..";

/**
 * Utility type to extract the remaining steps of a workflow.
 * Given a tuple of steps, it returns a new tuple with the first step removed.
 * If the tuple is empty, it returns an empty tuple.
 */
type RemainingSteps<Steps extends any[]> = Steps extends [any, ...infer Rest]
  ? Rest
  : [];

// Test cases to validate the RemainingSteps utility type

type workflow1 = RemainingSteps<["init", "validate", "execute", "complete"]>;
type testCase1 = Expect<Equal<workflow1, ["validate", "execute", "complete"]>>;

type workflow2 = RemainingSteps<["onlyStep"]>;
type testCase2 = Expect<Equal<workflow2, []>>;

type workflow3 = RemainingSteps<[]>;
type testCase3 = Expect<Equal<workflow3, []>>;
