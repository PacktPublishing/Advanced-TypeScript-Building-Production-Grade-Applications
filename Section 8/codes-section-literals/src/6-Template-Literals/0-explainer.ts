import { Equal, Expect } from "..";

const city = "Paris";
const country = "France";
export const location = `${city}, ${country}`;

type City = "Paris";
type Country = "France";
export type Location = `${City}, ${Country}`;

type VersionNumber = 3;
type FileLable = `file_v${VersionNumber}.txt`;

type Flag = true;
type StatusMessage = `Status is ${Flag}`;

type RecordData = {
  "100": string;
};

type Code = 100;

type GetValue<T, K extends keyof T> = T[K];

//type BadCase = GetValue<RecordData, Code>;
type GoodCase = GetValue<RecordData, `${Code}`>;

type SizeOption = "tiny" | "medium" | "large";
type CssClass = `size-${SizeOption}`;

type ThemeOption = "light" | "dark";
type ButtonSize = "small" | "big";

type ButtonVariant = `${ThemeOption}-${ButtonSize}`;

type Animal = "cat" | "dog";
type Emotion = "happy" | "sad";

function getEmoji(animal: Animal, emotion: Emotion) {
  const key = `${animal}-${emotion}` as const;

  switch (key) {
    case "cat-happy":
      return "😺";
    case "cat-sad":
      return "😿";
    case "dog-happy":
      return "🐶";
    case "dog-sad":
      return "😢";
    default:
      return assertUnreachable(key);
  }
}

function assertUnreachable(x: never): never {
  throw new Error("Unhandled case: " + x);
}

type Action = "READ" | "WRITE";
type Target = "order" | "customer";

type EndpointName = `${Lowercase<Action>}${Capitalize<Target>}`;

type ApiService = Record<EndpointName, (...args: any[]) => any>;

const apiEndpoints = {
  readOrder: () => Promise.resolve({ id: 101, total: 250 }),
  readCustomer: () => Promise.resolve({ name: "Charlie" }),
  writeOrder: (order: { id: number; total: number }) => Promise.resolve(),
  writeCustomer: (customer: { name: string }) => Promise.resolve(),
} satisfies ApiService;

type ParseVersion<Version> =
  Version extends `${infer Major}.${infer Minor}.${infer Patch}`
    ? [Major, Minor, Patch]
    : never;

type VersionA = ParseVersion<"3.5.6">;
type VesrionB = ParseVersion<"3.0">;

type DivideName<Str> = Str extends `${infer First} ${infer Last}`
  ? [First, Last]
  : never;

type NameOne = DivideName<"John Doe">;
type PersonName = DivideName<"Alexander Graham Bell">;

type BreakString<Str> = Str extends `${infer FirstChar}${infer Remainder}`
  ? [FirstChar, Remainder]
  : never;

type Part1 = BreakString<"Hello there.">;
type part2 = BreakString<"lsdjflkdf">;

type DivideArray<T extends any[]> = T extends [infer Head, ...infer Tail]
  ? [Head, Tail]
  : never;

type ArrayResult = DivideArray<["X", "Y", "Z"]>;

type ExtractFinalWord<S extends string> = S extends `${string} ${infer Tail}`
  ? ExtractFinalWord<Tail>
  : S;

type LW1 = ExtractFinalWord<"Harry James Potter">;

type SplitFirstAndLast<NameStr extends string> =
  NameStr extends `${infer First} ${infer Remainder}`
    ? [First, ExtractFinalWord<Remainder>]
    : never;

type FN = SplitFirstAndLast<"Harry James Potter">;

/*
  1. split the very first word
  2. split the rest based on _ & Capitalize them
  3. join every thing back
*/

type SnakeToCamelCase<Str> = Str extends `${infer Start}_${infer Rest}`
  ? `${Start}${Capitalize<SnakeToCamelCase<Rest>>}`
  : Str;

// it should not change string that has no underscore.
type result1 = SnakeToCamelCase<"hello">;
type test1 = Expect<Equal<result1, "hello">>;

// single underscore
type result2 = SnakeToCamelCase<"hello_world">;
type test2 = Expect<Equal<result2, "helloWorld">>;

// multiple underscores
type result3 = SnakeToCamelCase<"hello_code_licks_academy">;
type test3 = Expect<Equal<result3, "helloCodeLicksAcademy">>;
