import { Equal, Expect } from "..";

/**
 * Represents a generic API response.
 */
export interface ApiResponse<P> {
  status: number;
  payload: P;
}

type ExtractPayload<T> = TODO;

// Example 1: When the type is an ApiResponse of a string, it extracts "Success".
type example1 = ExtractPayload<ApiResponse<"Success">>;
type validation1 = Expect<Equal<example1, "Success">>;

// Example 2: When the type is an ApiResponse of an object, it extracts that object type.
type example2 = ExtractPayload<ApiResponse<{ id: number; name: string }>>;
type validation2 = Expect<Equal<example2, { id: number; name: string }>>;

// Example 3: When the type is not an ApiResponse, it remains unchanged.
type example3 = ExtractPayload<"Direct value">;
type validation3 = Expect<Equal<example3, "Direct value">>;
