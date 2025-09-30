import { Equal, Expect } from "..";

/**
 * Combine two parts of an HTTP response into one.
 *
 * The function takes two objects:
 * - `base`: the primary part of the response (e.g., status code, headers).
 * - `data`: additional details (e.g., payload, error message).
 *
 * The returned type is the intersection of the two input types,
 * meaning it includes all properties from both objects.
 */
export function buildResponse<Base, Data>(base: Base, data: Data): Base & Data {
  return { ...base, ...data };
}

// ✅ Valid usage examples:

// Example 1: Combining a response's status with its data.
const response1 = buildResponse({ status: 200 }, { data: "OK" });
type test1 = Expect<
  Equal<typeof response1, { status: number } & { data: string }>
>;

// Example 2: Building a response with only the base part.
const response2 = buildResponse({ status: 404 }, {});
type test2 = Expect<Equal<typeof response2, { status: number }>>;

// Example 3: Building a response with only data information.
const response3 = buildResponse({}, { message: "Not Found" });
type test3 = Expect<Equal<typeof response3, { message: string }>>;

// Example 4: Combining multiple aspects of a response.
const response4 = buildResponse(
  { status: 500, error: "Server Error" },
  { retry: true, timeout: 3000 }
);
type test4 = Expect<
  Equal<
    typeof response4,
    { status: number; error: string } & { retry: boolean; timeout: number }
  >
>;
