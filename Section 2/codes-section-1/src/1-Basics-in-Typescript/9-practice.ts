// This helper function should is supposed to signals that an unexpected case has occurred.
export function assertUnreachable(value: TODO): TODO {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
}

type ApiResponse =
  | { status: 200; data: string }
  | { status: 404; error: string }
  | { status: 500; error: string };

const CURRENT_STATUS: 200 | 404 | 500 = 200;

// ✅ In an if-statement where we know the status is 200,
// the branch where status !== 200 is unreachable.
if (CURRENT_STATUS !== 200) {
  assertUnreachable(CURRENT_STATUS);
}

// ❌ Calling assertUnreachable on CURRENT_STATUS outside of a narrowed branch is an error.
assertUnreachable(CURRENT_STATUS);

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
