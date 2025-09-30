import { Equal, Expect } from "..";

export type IsTwoElementTuple<T> = TODO;

type example1 = IsTwoElementTuple<[1, 2]>;
type test1 = Expect<Equal<example1, true>>;

type example2 = IsTwoElementTuple<["a", "b", "c"]>;
type test2 = Expect<Equal<example2, false>>;

type example3 = IsTwoElementTuple<123>;
type test3 = Expect<Equal<example3, false>>;

type example4 = IsTwoElementTuple<["a"]>;
type test4 = Expect<Equal<example4, false>>;

type example5 = IsTwoElementTuple<[]>;
type test5 = Expect<Equal<example5, false>>;
