import { Equal, Expect } from "..";

export type OptionalizeTimestamp<T extends { timestamp: unknown }> = TODO;

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
