// This helper function should only be called with a value of type 'never'.
// It signals that an unexpected case has occurred.
export function assertUnreachable(value: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
}

// An example union type representing possible API response statuses.
type ApiResponse =
  | { status: 200; data: string }
  | { status: 404; error: string }
  | { status: 500; error: string };

const CURRENT_STATUS: 200 | 404 | 500 = 200;

// ✅ In an if-statement where we know the status is 200,
// the branch where status !== 200 is unreachable.
if (CURRENT_STATUS !== 200) {
  // Here, TypeScript understands that CURRENT_STATUS must be of type 'never'
  // because the only possibility in this branch is that it isn’t 200.
  assertUnreachable(CURRENT_STATUS);
}

// ❌ Calling assertUnreachable on CURRENT_STATUS outside of a narrowed branch is an error.
// @ts-expect-error
assertUnreachable(CURRENT_STATUS);

/**
 * Handles a full API response.
 *
 * This function uses a switch statement to handle each possible status code.
 * The default branch calls `assertUnreachable`, ensuring that if any status is unhandled,
 * TypeScript will flag it.
 */
function handleApiResponse(response: ApiResponse): string {
  switch (response.status) {
    case 200:
      return `Success: ${response.data}`;
    case 404:
      return `Not Found: ${response.error}`;
    case 500:
      return `Server Error: ${response.error}`;
    // ✅ All cases handled: this branch is unreachable.
    default:
      return assertUnreachable(response);
  }
}

/**
 * A faulty version of the response handler where not all cases are explicitly handled.
 *
 * In this example, we only handle the 200 status.
 * Calling `assertUnreachable` in the default branch here is incorrect,
 * because responses with status 404 or 500 are possible.
 */
function handleIncompleteResponse(response: ApiResponse): string {
  switch (response.status) {
    case 200:
      return `Success: ${response.data}`;
    // ❌ The cases for 404 and 500 are missing,
    // so using assertUnreachable here will produce a type error.
    default:
      return assertUnreachable(response);
  }
}
