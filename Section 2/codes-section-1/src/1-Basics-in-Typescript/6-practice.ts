import { Equal, Expect } from "..";

export function buildResponse(base: TODO, data: TODO): TODO {
  return { ...base, ...data };
}

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
