import { Equal, Expect } from "..";

namespace fromEntries {
  type FromEntries<Entries extends [any, any]> = {
    [Entry in Entries as Entry[0]]: Entry[1];
  };

  type res1 = FromEntries<["a", string]>;
  type test1 = Expect<Equal<res1, { a: string }>>;

  type res2 = FromEntries<["a", string] | ["b", number]>;
  type test2 = Expect<Equal<res2, { a: string; b: number }>>;

  type res3 = FromEntries<never>;
  type test3 = Expect<Equal<res3, {}>>;
}
