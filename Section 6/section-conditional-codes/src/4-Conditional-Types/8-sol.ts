import { Equal, Expect } from "..";

/**
 * Utility type to determine if an order can be placed.
 * It evaluates to `true` only if both LoggedIn and ValidPayment are `true`;
 * otherwise, it evaluates to `false`.
 */
type CanPlaceOrder<LoggedIn extends boolean, ValidPayment extends boolean> = [
  LoggedIn,
  ValidPayment
] extends [true, true]
  ? true
  : false;

// Type-level test cases

type orderTest1 = CanPlaceOrder<true, true>;
type orderTest2 = CanPlaceOrder<false, true>;
type orderTest3 = CanPlaceOrder<true, false>;
type orderTest4 = CanPlaceOrder<false, false>;

type test1 = Expect<Equal<orderTest1, true>>;
type test2 = Expect<Equal<orderTest2, false>>;
type test3 = Expect<Equal<orderTest3, false>>;
type test4 = Expect<Equal<orderTest4, false>>;

/**
 * Simulates attempting to place an order.
 * At runtime, it checks if the customer is logged in and has a valid payment method.
 * The return type is determined by the conditional type CanPlaceOrder.
 */
function attemptOrder<LoggedIn extends boolean, ValidPayment extends boolean>(
  loggedIn: LoggedIn,
  validPayment: ValidPayment
): CanPlaceOrder<LoggedIn, ValidPayment> {
  // The runtime check mirrors the type-level logic.
  if (loggedIn && validPayment) {
    return true as CanPlaceOrder<LoggedIn, ValidPayment>;
  }
  return false as CanPlaceOrder<LoggedIn, ValidPayment>;
}

// Example usage:
const order1 = attemptOrder(true, true); // Allowed to place order (true)
const order2 = attemptOrder(false, true); // Not allowed (false)
const order3 = attemptOrder(true, false); // Not allowed (false)
const order4 = attemptOrder(false, false); // Not allowed (false)

console.log("Order 1 allowed:", order1); // Order 1 allowed: true
console.log("Order 2 allowed:", order2); // Order 2 allowed: false
console.log("Order 3 allowed:", order3); // Order 3 allowed: false
console.log("Order 4 allowed:", order4); // Order 4 allowed: false
