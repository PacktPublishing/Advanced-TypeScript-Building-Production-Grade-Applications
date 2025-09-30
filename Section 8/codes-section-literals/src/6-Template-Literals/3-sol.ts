import { Equal, Expect } from "..";

type EndsWith<
  Str extends string,
  Suffix extends string
> = Str extends `${string}${Suffix}` ? true : false;

type result1 = EndsWith<"somefile.json", "json">;
type test1 = Expect<Equal<result1, true>>;

type result2 = EndsWith<"somedummydomain.com", "org">;
type test2 = Expect<Equal<result2, false>>;

type result3 = EndsWith<"a perfect sentence.", ".">;
type test3 = Expect<Equal<result3, true>>;
