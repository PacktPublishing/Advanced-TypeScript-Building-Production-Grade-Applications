import { Equal, Expect } from "..";

/**
 * The UpdateSettings type takes two types, Base and Overrides,
 * and returns a new type where the properties of Overrides
 * override the properties of Base.
 */
export type UpdateSettings<Base, Overrides> = Omit<Base, keyof Overrides> &
  Overrides;

/**
 * Merges two settings objects, with properties from the second object
 * overriding those from the first object when keys overlap.
 */
const mergeSettings = <Base, Overrides>(
  base: Base,
  overrides: Overrides
): UpdateSettings<Base, Overrides> => ({
  ...base,
  ...overrides,
});

// --- Type-Level Tests ---

// Test 1: Override the 'theme' property with a different literal type.
type result1 = UpdateSettings<
  { username: string; theme: "light" },
  { theme: "dark" }
>;
// Expected type: { username: string } & { theme: "dark" }
type test1 = Expect<Equal<result1, { username: string } & { theme: "dark" }>>;

// Test 2: Override the 'volume' and 'notifications' properties with specific values.
type result2 = UpdateSettings<
  { username: string; volume: number; notifications: boolean },
  { volume: 10; notifications: true }
>;
// Expected type: { username: string } & { volume: 10; notifications: true }
type test2 = Expect<
  Equal<result2, { username: string } & { volume: 10; notifications: true }>
>;

// Test 3: Merge objects with no overlapping properties.
type result3 = UpdateSettings<
  { username: string; language: string },
  { timezone: string }
>;
// Expected type: { username: string; language: string } & { timezone: string }
type test3 = Expect<
  Equal<result3, { username: string; language: string } & { timezone: string }>
>;
