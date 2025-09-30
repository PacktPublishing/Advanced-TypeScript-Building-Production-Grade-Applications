import { Equal, Expect } from "..";

namespace pick {
  type MyPick<Obj, T> = {
    [K in Extract<keyof Obj, T>]: Obj[K];
    /*       👆
       We only need to use `Extract`
           instead of `Exclude`!       */
  };

  type res1 = MyPick<{ a: string; b: number; c: boolean }, "a">;
  type test1 = Expect<Equal<res1, { a: string }>>;

  type res2 = MyPick<{ a: string; b: number; c: boolean }, "a" | "b">;
  type test2 = Expect<Equal<res2, { a: string; b: number }>>;

  type res3 = MyPick<
    {
      getName: () => string;
      setName: (x: string) => void;
    },
    `get${string}`
  >;
  type test3 = Expect<Equal<res3, { getName: () => string }>>;
}
