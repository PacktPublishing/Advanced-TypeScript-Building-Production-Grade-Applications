import { Equal, Expect } from "..";

type ExtractResults<Ops extends any[]> = Ops extends [
  Promise<infer R>,
  ...infer Rest
]
  ? [R, ...ExtractResults<Rest>]
  : [];

/**
 * Wraps the extracted tuple in a Promise.
 */
type ResolvedResults<Ops extends any[]> = Promise<ExtractResults<Ops>>;

/**
 * Declares a function `gatherAsync` that takes a tuple of Promises and returns a single Promise
 * that resolves to a tuple of the resolved values.
 */
export declare function gatherAsync<
  // Infer `Ops` as a tuple of Promises.
  Ops extends [Promise<any>, ...Promise<any>[]]
>(...operations: Ops): ResolvedResults<Ops>;

// --- Usage Examples and Type-Level Tests ---

// Example 1: Two asynchronous operations.
const resultA = gatherAsync(
  Promise.resolve(42),
  Promise.resolve("Completed" as const)
);
type expectedA = Promise<[number, "Completed"]>;
type testA = Expect<Equal<typeof resultA, expectedA>>;

// Example 2: Three asynchronous operations.
const resultB = gatherAsync(
  Promise.resolve(true),
  Promise.resolve({ id: 1, name: "Alice" }),
  Promise.resolve([1, 2, 3])
);
type expectedB = Promise<[boolean, { id: number; name: string }, number[]]>;
type testB = Expect<Equal<typeof resultB, expectedB>>;

// Example 3: A single asynchronous operation.
const resultC = gatherAsync(Promise.resolve({ success: true }));
type expectedC = Promise<[{ success: boolean }]>;
type testC = Expect<Equal<typeof resultC, expectedC>>;

// Example 4: Five asynchronous operations.
const resultD = gatherAsync(
  Promise.resolve("A"),
  Promise.resolve("B"),
  Promise.resolve("C"),
  Promise.resolve("D"),
  Promise.resolve("E")
);
type expectedD = Promise<[string, string, string, string, string]>;
type testD = Expect<Equal<typeof resultD, expectedD>>;

// --- Real-World Backend Scenario ---

/**
 * In a typical backend service, you might need to run multiple async requests in parallel.
 * For instance, fetching user details, recent orders, and notifications.
 * The following function demonstrates how to aggregate these operations using `gatherAsync`.
 */
async function aggregateServiceData() {
  // Simulate three async operations (e.g., API calls).
  const fetchUser = Promise.resolve({ id: 1, username: "johndoe" });
  const fetchOrders = Promise.resolve([{ orderId: 101 }, { orderId: 102 }]);
  const fetchNotifications = Promise.resolve(["Alert", "Reminder"]);

  // Use gatherAsync to run them in parallel and collect the results.
  const [user, orders, notifications] = await gatherAsync(
    fetchUser,
    fetchOrders,
    fetchNotifications
  );

  console.log("User:", user);
  console.log("Orders:", orders);
  console.log("Notifications:", notifications);
}

aggregateServiceData();
