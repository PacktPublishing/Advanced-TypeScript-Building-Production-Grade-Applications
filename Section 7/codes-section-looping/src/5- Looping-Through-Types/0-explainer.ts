type Column = {
  key: string;
  entries: unknown[];
};

type DataTable = [Column, ...Column[]];

type UserDataTable = [
  { key: "username"; entries: string[] },
  { key: "score"; entries: number[] },
  { key: "active"; entries: boolean[] }
];

type FindColumn<Table, K> = Table extends [infer First, ...infer Rest]
  ? First extends { key: K; entries: infer E }
    ? E
    : FindColumn<Rest, K>
  : undefined;

type usernames = FindColumn<UserDataTable, "username">;
type scores = FindColumn<UserDataTable, "score">;
type undefinedtest = FindColumn<[], "blabla">;

type UserList = [
  { username: "user1"; role: "user" },
  { username: "user2"; role: "admin" }
];

type MapRoles<List extends unknown[]> = List extends [
  infer First,
  ...infer Rest
]
  ? [ExtractRole<First>, ...MapRoles<Rest>]
  : [];

type ExtractRole<Obj> = Obj extends { role: infer R } ? R : "no-role";

type test1 = MapRoles<UserList>;

// type RecursiveMap<List extends unknown[]> =
//   List extends [infer First, ...infer Rest]
//     ? [/* transform First somehow */, ...RecursiveMap<Rest>]
//     : [];

type SomeVlaues = [1, "hello", true, "bye"]; // ["hello", "bye"]

type FilterStrings<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? First extends string
    ? [First, ...FilterStrings<Rest>]
    : FilterStrings<Rest>
  : [];

// type SomeFilter<List> =
// List extends [infer First, ...infer Rest]
//   ? First extends  /* ... ❗ the condition */
//     ? [First, ...SomeFilter<Rest>]
//     : SomeFilter<Rest>
//   : [];

type ProductValues = [["title", "TV 65' "], ["price", 499.99]];
// Expected type: { title: "TV 65'"; price: 499.99 }
