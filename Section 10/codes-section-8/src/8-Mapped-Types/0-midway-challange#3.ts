import { Equal, Expect } from "..";

/**
 * Implement a `FromEntries` generic, transforming
 * a union of [key, value] entries into an object type.
 */
namespace fromEntries {
  type FromEntries<Entries extends [any, any]> = TODO;

  type res1 = FromEntries<["a", string]>;
  type test1 = Expect<Equal<res1, { a: string }>>;

  type res2 = FromEntries<["a", string] | ["b", number]>;
  type test2 = Expect<Equal<res2, { a: string; b: number }>>;

  type res3 = FromEntries<never>;
  type test3 = Expect<Equal<res3, {}>>;
}
