import { Equal, Expect } from "..";

export type ArrayElementsType<A extends unknown[]> = TODO;

// No nested arrays
type test1 = ArrayElementsType<["1", "2", "3"]>;
type testCase1 = Expect<Equal<test1, "1" | "2" | "3">>;

// One level of nested arrays
type test2 = ArrayElementsType<[[4, 5], [6, 7]]>;
type testCase2 = Expect<Equal<test2, 4 | 5 | 6 | 7>>;

// Two levels of nested arrays
type test3 = ArrayElementsType<[[[100], ["one", "two"]], [[100]]]>;
type testCase3 = Expect<Equal<test3, [100] | ["one", "two"]>>;
