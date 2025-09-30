import { Equal, Expect } from "..";

export type AppendStep<Pipeline extends any[], NewStep> = TODO;

// Test cases to validate the AppendStep utility type

// Test 1: Append a new step "save" to a pipeline containing "fetch" and "process".
type result1 = AppendStep<["fetch", "process"], "save">;
// Expected result1 to be ["fetch", "process", "save"]
type test1 = Expect<Equal<result1, ["fetch", "process", "save"]>>;

// Test 2: Append a step "initialize" to an empty pipeline.
type result2 = AppendStep<[], "initialize">;
// Expected result2 to be ["initialize"]
type test2 = Expect<Equal<result2, ["initialize"]>>;
