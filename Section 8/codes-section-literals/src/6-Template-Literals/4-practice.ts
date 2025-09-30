import { Equal, Expect } from "..";

/**
 * a union type of vowels.
 */
type Vowel = "a" | "e" | "i" | "o" | "u" | "A" | "E" | "I" | "O" | "U";

type RemoveVowels<Str extends string> = TODO;

type ToSKU<Str extends string> = TODO;

type SKU1 = ToSKU<"Backend">; // Expected: "bcknd"
type TestSKU1 = Expect<Equal<SKU1, "bcknd">>;

type SKU2 = ToSKU<"TypeScript">; // Expected: "typscrpt"
type TestSKU2 = Expect<Equal<SKU2, "typscrpt">>;

type SKU3 = ToSKU<"OpenAI">; // Expected: "pn"
type TestSKU3 = Expect<Equal<SKU3, "pn">>;

/**
 *
 * In a backend system, you may need to generate a simplified SKU code from a product name.
 * The following function simulates this transformation at runtime.
 */
export function generateSKU<S extends string>(productName: S): ToSKU<S> {
  // Remove all vowels from the product name and convert to lowercase.
  return productName.replace(/[aeiou]/gi, "").toLowerCase() as ToSKU<S>;
}

// Example usage:
const sku = generateSKU("Premium Coffee Beans");
console.log("Generated SKU:", sku); // Expected output: "prmcmff cff bns" (without vowels)
