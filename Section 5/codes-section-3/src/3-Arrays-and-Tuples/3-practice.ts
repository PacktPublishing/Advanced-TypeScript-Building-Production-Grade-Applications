import { Equal, Expect } from "..";

export type ConvertTupleToArray<T extends unknown[]> = TODO;

type result1 = ConvertTupleToArray<[number, string, boolean]>;
// Expect result1 to be (number | string | boolean)[] since the elements of the tuple are converted to an array type
type check1 = Expect<Equal<result1, (number | string | boolean)[]>>;

type result2 = ConvertTupleToArray<[]>;
// Expect result2 to be never[] since the tuple is empty
type check2 = Expect<Equal<result2, never[]>>;

type result3 = ConvertTupleToArray<["A"] | ["B"] | ["C"]>;
// Expect result3 to be ("A" | "B" | "C")[] since the elements of the union of tuples are converted to an array type
type check3 = Expect<Equal<result3, ("A" | "B" | "C")[]>>;
