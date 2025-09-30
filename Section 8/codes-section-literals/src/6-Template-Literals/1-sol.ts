import { Equal, Expect } from "..";

/**
 * Define the `ApiCredentials` type to ensure the `ApiKey` property
 * starts with 'Key ' followed by a valid API key.
 *
 * Valid API key format:
 *   "Key " followed by 4 segments separated by dashes.
 *
 * Example: "Key ABCD-1234-EFGH-5678"
 */
export type ApiCredentials = {
  ApiKey: `Key ${string}-${string}-${string}-${string}`;
};

// Valid example: Properly formatted API key.
const validCredentials: ApiCredentials = {
  ApiKey: "Key ABCD-1234-EFGH-5678",
};

// Invalid example 1: Missing the required "Key " prefix.
// @ts-expect-error
const invalidCredentials1: ApiCredentials = {
  ApiKey: "ABCD-1234-EFGH-5678",
};

// Invalid example 2: Only three segments instead of four.
// @ts-expect-error
const invalidCredentials2: ApiCredentials = {
  ApiKey: "Key ABCD-1234-EFGH",
};

// Invalid example 3: Five segments instead of four.
// @ts-expect-error
const invalidCredentials3: ApiCredentials = {
  ApiKey: "Key ABCD-1234-EFGH-5678-XYZ",
};

// Invalid example 4: Missing dashes between segments.
// @ts-expect-error
const invalidCredentials4: ApiCredentials = {
  ApiKey: "Key ABCD1234EFGH5678",
};
