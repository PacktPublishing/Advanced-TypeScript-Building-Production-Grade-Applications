import { Equal, Expect } from "..";

namespace mutable {
  type Mutable<Obj> = {
    -readonly [Key in keyof Obj]: Obj[Key];
  };
  /**
   * That's right! We can use a `-` minus sign in front
   * of `readonly` too. This will have the effect of
   * removing the `readonly` modifier from all properties
   * in your object.
   */

  type res1 = Mutable<{ readonly name: string; readonly age: number }>;
  type test1 = Expect<Equal<res1, { name: string; age: number }>>;

  type res2 = Mutable<{ readonly a: string; b: "not readonly" }>;
  type test2 = Expect<Equal<res2, { a: string; b: "not readonly" }>>;
}
