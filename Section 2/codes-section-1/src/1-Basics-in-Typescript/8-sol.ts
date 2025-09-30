/**
 * Extracts an error code from an unknown error value.
 *
 * - If the error is an instance of Error and has a 'code' property,
 *   it returns that code.
 * - If the error is a plain object with a 'code' property,
 *   it returns that code.
 * - Otherwise, it returns "UNKNOWN" as a fallback.
 */
function getErrorCode(error: unknown): string | number | "UNKNOWN" {
  // Check if error is an instance of Error and contains a 'code' property.
  if (error instanceof Error && "code" in error) {
    const maybeCode = (error as any).code;
    if (typeof maybeCode === "string" || typeof maybeCode === "number") {
      return maybeCode;
    }
  }

  // If error is a plain object with a 'code' property.
  if (typeof error === "object" && error !== null && "code" in error) {
    const maybeCode = (error as any).code;
    if (typeof maybeCode === "string" || typeof maybeCode === "number") {
      return maybeCode;
    }
  }

  // Fallback if no code is found.
  return "UNKNOWN";
}

// --- Usage Examples ---

// Example 1: Using a custom error class that includes a code.
class CustomError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

try {
  throw new CustomError("Not Found", 404);
} catch (err) {
  console.log(getErrorCode(err)); // Expected output: 404
}

// Example 2: Throwing a plain object with a code property.
try {
  throw { code: "E500", message: "Internal Server Error" };
} catch (err) {
  console.log(getErrorCode(err)); // Expected output: "E500"
}

// Example 3: Throwing a string error (without a code property).
try {
  throw "A string error";
} catch (err) {
  console.log(getErrorCode(err)); // Expected output: "UNKNOWN"
}
