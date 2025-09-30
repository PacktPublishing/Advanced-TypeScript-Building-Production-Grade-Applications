import { Equal, Expect } from "..";

/**
 * Implement a `PickByValue` generic than only keep
 * properties of `Obj` that are assignable to
 * the `Condition` type parameter.
 */
namespace pickByValue {
  type PickByValue<Obj, Condition> = TODO;

  /** Provided helper functions */
  type Entries<Obj> = {
    [K in keyof Obj]: [K, Obj[K]];
  }[keyof Obj];

  type FromEntries<Entries extends [any, any]> = {
    [Entry in Entries as Entry[0]]: Entry[1];
  };

  /** Unit tests */
  type res1 = PickByValue<{ a: 1; b: 2; c: undefined }, number>;
  type test1 = Expect<Equal<res1, { a: 1; b: 2 }>>;

  type res2 = PickByValue<{ age: 22; name: "Alice"; bio: string }, string>;
  type test2 = Expect<Equal<res2, { name: "Alice"; bio: string }>>;

  type res3 = PickByValue<{}, string>;
  type test3 = Expect<Equal<res3, {}>>;
}
