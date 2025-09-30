import { Equal, Expect } from "..";

/**
 * Represents a generic API response.
 */
interface ApiResponse<T> {
  status: number;
  payload: T;
}

/**
 * Utility type to extract the payload type from an API response.
 * If the input type is an ApiResponse, it returns the type of the payload;
 * otherwise, it returns the input type itself.
 */
type ExtractPayload<T> = T extends ApiResponse<infer P> ? P : T;

// Example 1: When the type is an ApiResponse of a string, it extracts "Success".
type test1 = ExtractPayload<ApiResponse<"Success">>;
type testCase1 = Expect<Equal<test1, "Success">>;

// Example 2: When the type is an ApiResponse of an object, it extracts that object type.
type test2 = ExtractPayload<ApiResponse<{ id: number; name: string }>>;
type testCase2 = Expect<Equal<test2, { id: number; name: string }>>;

// Example 3: When the type is not an ApiResponse, it remains unchanged.
type test3 = ExtractPayload<"Direct value">;
type testCase3 = Expect<Equal<test3, "Direct value">>;
