import { Equal, Expect } from "..";

export function getByIndex(index: number, first: TODO, second: TODO): TODO {
  return index === 0 ? first : second;
}

// ✅ Valid usage:
const value1 = getByIndex(0, true, false);
type test1 = Expect<Equal<typeof value1, true | false>>;

const value2 = getByIndex(1, 1, 2);
type test2 = Expect<Equal<typeof value2, 1 | 2>>;

const value3 = getByIndex(0, 2, "example string");
type test3 = Expect<Equal<typeof value3, 2 | "example string">>;

const value4 = getByIndex(1, true, 7);
type test4 = Expect<Equal<typeof value4, true | 7>>;
