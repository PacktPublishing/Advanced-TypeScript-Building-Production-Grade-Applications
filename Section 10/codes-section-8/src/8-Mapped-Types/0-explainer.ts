// Transforms all keys from snake_case to camelCase:
const apiPayload = {
  chapter_title: "Mapped Types",
  author: { full_name: "Codelicks Academy" },
};

//const camelized = deepCamelize(apiPayload);
//    ^?
// { chapterTitle: string; author: { fullName: string } }

// Transforms a deeply nested value:
const player = { position: { x: "1", y: 0 } };
//              This is a string 👆

//const newPlayer = update(player, "position.x", toNumber);
//    ^? { position: { x: number, y: number } }
//       Now it's a number! 👆

const pkg = { name: "such-wow", releases: [{ version: 1 }] };

//const newPkg = update(pkg, "releases[0].version", (v) => `${v}.0.0`);
//    ^? { name: string, releases: { version: string }[] }

type LetterUnion = "a" | "b" | "c";

type MT = {
  [Letter in LetterUnion]: `The letter is ${Letter}`;
  /*   👆                       👆
   we define             and we use it
  `Letter` here          over there.
                                     */
};

type MTExample = {
  //[ThisIsANewVariable in ThisIsAUnionType]: ...
  /*                    👆
  `in` lets us define a variable that will
  successively take each value in a union type.
                                                */
};

type UserType6 = {
  name: string;
  age: number;
};

type UT = {
  [Key in keyof UserType6]: UserType6[Key] | null;
};

type T7 = {
  //           👇
  [Key in "age" | "name"]: User[Key] | null;
};
// => { name: string | null; age: number | null }

type NullableValues<Obj> = {
  [Key in keyof Obj]: Obj[Key] | null;
};

type NonNullValues<Obj> = {
  [Key in keyof Obj]: Exclude<Obj[Key], null>;
};

type OrNull<T> = T | null;
type NotNull<T> = Exclude<T, null>;

type ATest = NullableValues<{ name: string; age: number }>;

type BTest = NullableValues<{ a: true; b: 23 }>;

type CTest = NonNullValues<{
  name: string | null;
  age: number | null;
}>;

declare function withDefault<T>(obj: T): NonNullValues<T>;

declare const partialUser: { name: string | null };

const usertest = withDefault(partialUser);
//     ^? { name: string }

// const mapOverValues = (obj, fn) => {
//   const output = {};
//   for (const [key, value] of Object.entries(obj)) {
//     output[key] = fn(value); // transform the current value!
//   }
//   return output;
// };

type BackendEnv = { publicKey: string; secretKey: string };

type FrontendEnv = { publicKey: string };

type FrontendEnv2 = {
  [Key in Exclude<keyof BackendEnv, `secret${string}`>]: BackendEnv[Key];
};

type FrontendEnv3 = Omit<BackendEnv, `secret${string}`>;

//   👇 We created this Mapped Type a few sections ago

// type NullableValues<Obj> = {
//   [Key in keyof Obj]: Obj[Key] | null;
// };

type NV = NullableValues<string[]>;
// => (string | null)[]

type NV2 = NullableValues<[null, boolean, string]>;
// => [null, boolean | null, string | null]

const key1: keyof [1, 2, 3] = 1; // ✅ `1` is a key of this tuple
const key2: keyof [1, 2, 3] = "map"; // ✅ but "map" is also valid.

type NullableArray = NullableValues<string[]>;
// => (string | null)[]

//const map: NullableArray["map"] = null;
//    ~~~ ❌ `null` isn't assignable to `NullableArray["map"]`

// type Partial<Obj> = {
//   [Key in keyof Obj]?: Obj[Key]
// }

type TestType6 = Partial<{ name: string; age: number }>;

type Ptest = Partial<string[]>;
type Ptest2 = Partial<[string, number]>;

// type Required<Obj> = {
//   [Key in keyof Obj]-?: Obj[Key];
//   //                👆
// };

type Rtest = Required<{ name?: string; age?: number }>;

function doSomething(obj: { readonly prop: string }) {
  //                            👆
  //obj.prop = "Hello";
  //  ~~~~
  //  ❌ Cannot re-assign 'prop' because it is a read-only property.
}

const units = {
  bytes: ["B", "kB", "MB", "GB"],
} as const;
// units: { readonly bytes: readonly ["B", "kB", "MB", "GB"] }

type Byte = (typeof units)["bytes"][number];
//    ^? "B" | "kB" | "MB" | "GB"

type ROTest = Readonly<{ name: string; age: number }>;

type UserForm = {
  firstName: InputState;
  lastName?: InputState;
};

type InputState = {
  value: string;
  isValid: boolean;
};

type FormToPayload<Form> = {
  [Inputname in keyof Form]: GetValue<Form[Inputname]>;
};

type GetValue<T> = T extends { value: infer V } ? V : never;

type FTPTest = FormToPayload<UserForm>;

//type T = { readonly a: string; b?: number };

//type U = { [K in keyof T]: 42 };
// { readonly a: 42; b?: 42 };

type U2 = { [K in keyof T | "c"]: 42 };
// { a: 42; b: 42; c: 42 };
//  👆       👆
// no more modifiers!

const unsafeFunction = () => {
  return {} as { name: string };
  /*        👆
    We "cast" our empty object
        to a different type. 
                               */
};

unsafeFunction().name.toLowerCase();
//                   ^ ✅ This type-checks...
//                        but throws at runtime!

type RenameKeys<Obj> = {
  [K in keyof Obj as `new_${string & K}`]: Obj[K];
  //              👆
};

type RKTest = RenameKeys<{ id: number; name: string }>;

type ToGetters<Obj> = {
  [K in keyof Obj as `get${Capitalize<string & K>}`]: () => Obj[K];
};

type TGTest = ToGetters<{ id: number; name: string }>;

// type SnakeToCamel<Str> =
//   Str extends `${infer First}_${infer Rest}`
//    Split on underscores 👆
//     ? `${First}${SnakeToCamel<Capitalize<Rest>>}`
//      Capitalize each word 👆
//     : Str;

type Camelize<T> = {
  [K in keyof T as SnakeToCamel<K>]: T[K];
};

type CTest1 = Camelize<{ some_long_key: number; another_one: string }>;

const groups = groupByType([
  { type: "img" as const, src: "a.png" },
  { type: "img" as const, src: "b.png" },
  { type: "paragraph" as const, content: "..." },
]);

//The output object
const groups = {
  img: [
    { type: "img", src: "a.png" },
    { type: "img", src: "b.png" },
  ],
  paragraph: [{ type: "paragraph", content: "..." }],
};

//The output type
type GroupByTypeOutput = {
  img: { type: "img"; src: string }[];
  paragraph: { type: "paragraph"; content: string }[];
};

declare function groupByType<U extends { type: string }>(
  objects: U[]
): GroupByType<U>;

type GroupByType<UnionOfObj extends { type: string }> = {
  [Obj in UnionOfObj as Obj["type"]]: Obj[];
  //        👆                 👆
  //    We loop over        We use their "type"
  // a union of objects!      as our keys.
};

type Img = { type: "img"; src: string };
type Paragraph = { type: "paragraph"; content: string };

type GBTTest = GroupByType<Img | Paragraph>;

type Input = { type: "input"; value: string };
type Button = { type: "button"; onClick: () => void };
type Select = { type: "select"; options: string[] };

declare const formElements: (Input | Button | Select)[];

const grouped = groupByType(formElements);

const entries = Object.entries({ name: "Jack", age: 32 });
// => [["name", "Jack"], ["age", 32]]

const user_test = Object.fromEntries(entries);
// => { name: "Jack", age: 32 }

type E = Entries<{ name: "Jack"; age: 32 }>;
// => ["name", "Jack"] | ["age", 32]

type UserTest = FromEntries<E>;
// => { name: "Jack", age: 32 }

//type ValueOf<T> = T[keyof T];

type Entries<Obj> = ValueOf<{
  [Key in keyof Obj]: [Key, Obj[Key]];
}>;

type AnyFunction = (...args: any) => any;

// type NoFunctions<T> = {
//   [K in keyof T]: T[K] extends AnyFunction ? never : T[K];
//   //                        Does this work? 🤔 ^
// };

// type NFTest = NoFunctions<{ someFn: () => string; something: string }>;

// type NoFunctions2<T> = {
//   [K in Exclude<keyof T, ...>]: T[K]
//   //                      ^
//   // What should we put here? 🤔
// };

type FromEntries2<Entries extends [any, any]> = {
  [Entry in Entries as Entry[0]]: Entry[1];
};

type NoFunctions<T> = FromEntries2<ExcludeFunctions<Entries<T>>>;
//                       Step 3  <-    Step 2    <- Step 1
//                         ✅           TODO          ✅

type ExcludeFunctions<Entry> =
  // If the value is a function 👇
  Entry extends [any, AnyFunction]
    ? // filter the entry out
      never
    : // otherwise, keep it!
      Entry;

type EF = NoFunctions<{
  someFn: () => string;
  something: string;
}>;

type EF2 = NoFunctions<{
  a: () => null;
  b: () => string;
  c: string;
  d: number;
}>;

// This would also work:
type ExcludeFunctions2<Entry> = Exclude<Entry, [any, AnyFunction]>;
/*                     👆
          Remove any type assignable to 
     [any, AnyFunction] from the `Entry` union. 
                                                 */

type EFTest = ExcludeFunctions<["getId", () => string] | ["version", string]>;
// => ["version", string]

type OmitByValue<T, Omitted> = FromEntries2<
  Exclude<Entries<T>, [any, Omitted]>
>;

// type A = OmitByValue<{ a: () => string; b: string }, AnyFunction>;
// //   ^? { b: string }

// type B = OmitByValue<{ a: "a"; b: 1; c: boolean }, string>;
// //   ^? { b: 1; c: boolean }

// type C = OmitByValue<{ a: null; b: undefined; c: boolean }, null | undefined>;
// //   ^? { c: boolean }

type TTest1 = MakeOptional<{ a: 1; b: 2; c: 3 }, "a">;
//   ^? { a?: 1, b: 2, c: 3 }

type TTest2 = MakeOptional<{ a: 1; b: 2; c: 3 }, "a" | "b">;
//   ^? { a?: 1, b?: 2, c: 3 }

// [K in ...]?

// type MakeOptional<T, Keys> = {
//   [K in keyof T]?: T[K];
//   //            👆
//   //  This applies to all keys
// };

// type MakeOptional<T, Keys> = {
//   // optional props
//   [K in Extract<keyof T, Keys>]?: T[K];
//   // other props
//   [K in Exclude<keyof T, Keys>]: T[K];
// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~
// // ^ ❌ Invalid syntax error
// }

type MakeOptional<T, Keys> =
  // optional props
  {
    [K in Extract<keyof T, Keys>]?: T[K];
  } & { [K in Exclude<keyof T, Keys>]: T[K] }; // other props                           👆

//SomeGeneric<Input>

type Compute<T> = { [K in keyof T]: Compute<T[K]> } | never;

type DeepPartial<T> =
  | {
      [K in keyof T]?: DeepPartial<T[K]>;
      //            👆        👆
      //     Make keys       Recurse
      //     optional.       on values.
    };
// A | never = A

type DPTest = Compute<DeepPartial<{ a: string; b: { c: string; d: number } }>>;
// type T = { a?: string; b?: { c?: string; d?: number } };
