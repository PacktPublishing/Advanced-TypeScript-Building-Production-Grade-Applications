import { Equal, Expect } from "..";

export type RemainingSteps<Steps extends any[]> = TODO;

// Test cases to validate the RemainingSteps utility type

type workflow1 = RemainingSteps<["init", "validate", "execute", "complete"]>;
type testCase1 = Expect<Equal<workflow1, ["validate", "execute", "complete"]>>;

type workflow2 = RemainingSteps<["onlyStep"]>;
type testCase2 = Expect<Equal<workflow2, []>>;

type workflow3 = RemainingSteps<[]>;
type testCase3 = Expect<Equal<workflow3, []>>;
