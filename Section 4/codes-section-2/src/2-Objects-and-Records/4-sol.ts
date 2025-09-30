import { Equal, Expect } from "..";

/**
 * This utility type ensures that T has a `timestamp` property.
 * It makes the `timestamp` property optional while keeping all other properties intact.
 */
export type OptionalizeTimestamp<T extends { timestamp: unknown }> = Partial<
  Pick<T, "timestamp">
> &
  Omit<T, "timestamp">;

// Test case: Check OptionalizeTimestamp with an object containing timestamp, message, and level properties.
type result1 = OptionalizeTimestamp<{
  timestamp: number;
  message: string;
  level: "info" | "warn" | "error";
}>;

// Expected type: { timestamp?: number } & { message: string; level: "info" | "warn" | "error" }
type test1 = Expect<
  Equal<
    result1,
    { timestamp?: number } & {
      message: string;
      level: "info" | "warn" | "error";
    }
  >
>;

// Test case: Check OptionalizeTimestamp with an object containing timestamp, url, and status properties.
type result2 = OptionalizeTimestamp<{
  timestamp: Date;
  url: string;
  status: number;
}>;

// Expected type: { timestamp?: Date } & { url: string; status: number }
type test2 = Expect<
  Equal<result2, { timestamp?: Date } & { url: string; status: number }>
>;
