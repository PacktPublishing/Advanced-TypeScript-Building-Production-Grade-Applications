import { Equal, Expect } from "..";

/**
 * Type utility to extract the type of the `data` property
 * from an object, or return `undefined` if the property does not exist.
 */
type DataType<T> = T extends { data: infer DataType } ? DataType : undefined;

// Test cases to validate the DataType type utility

type test1 = DataType<{
  error: null;
  code: 200;
  data: "Some data...";
}>;
type testCase1 = Expect<Equal<test1, "Some data...">>;

type test2 = DataType<{ data: string; code: number }>;
type testCase2 = Expect<Equal<test2, string>>;

type test3 = DataType<{ error: string }>;
type testCase3 = Expect<Equal<test3, undefined>>;

type test4 = DataType<{
  data: { content: string; keywords: string[] };
  code: number;
}>;
type testCase4 = Expect<Equal<test4, { content: string; keywords: string[] }>>;
