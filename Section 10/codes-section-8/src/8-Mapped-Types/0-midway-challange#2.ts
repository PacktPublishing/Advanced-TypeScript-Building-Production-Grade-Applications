/**
 * `Mutable` should take an object with read-only properties
 * and make them mutable.
 *
 * Hint: the syntax to remove the `readonly` modifier
 * is pretty similar to the syntax to remove the `?` optional
 * modifier...
 */
namespace mutable {
  type Mutable<Obj> = TODO;

  type res1 = Mutable<{ readonly name: string; readonly age: number }>;
  type test1 = Expect<Equal<res1, { name: string; age: number }>>;

  type res2 = Mutable<{ readonly a: string; b: "not readonly" }>;
  type test2 = Expect<Equal<res2, { a: string; b: "not readonly" }>>;
}
