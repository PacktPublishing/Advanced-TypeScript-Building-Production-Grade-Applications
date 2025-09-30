import { Equal, Expect } from "..";

/**
 * Utility type to combine a tuple of sensor reading arrays into
 * a single tuple type where each element is the reading from the corresponding sensor.
 */
type SyncReadings<Streams> = Streams extends [
  infer FirstArray extends any[],
  ...infer RestArrays
]
  ? [FirstArray[number], ...SyncReadings<RestArrays>]
  : [];

// type SyncReadings<Streams> = Streams extends [
//   (infer Value)[],
//   ...infer RestArrays
// ]
//   ? [Value, ...SyncReadings<RestArrays>]
//   : [];

/**
 * Declares a function `synchronizeSensors` that takes a tuple of sensor reading arrays
 * and returns an array of tuples, each tuple containing one reading from each sensor.
 */
declare function synchronizeSensors<
  // Infer SensorStreams as a non-empty tuple of arrays:
  SensorStreams extends [any[], ...any[][]]
>(...streams: SensorStreams): SyncReadings<SensorStreams>[];

// --- Example Usage and Type-Level Tests ---

// Example 1: Two sensors
const syncResult1 = synchronizeSensors([1, 2, 3], [true, false, true]);
// Expected type: [number, boolean][]
type testSync1 = Expect<Equal<typeof syncResult1, [number, boolean][]>>;

// Example 2: Three sensors
const syncResult2 = synchronizeSensors(
  [25, 26],
  [false, true],
  ["high", "low"]
);
// Expected type: [number, boolean, string][]
type testSync2 = Expect<Equal<typeof syncResult2, [number, boolean, string][]>>;

// Example 3: Sensors with possibly nullish values
const syncResult3 = synchronizeSensors(
  [15, 20, null],
  [true, false, undefined]
);
// Expected type: [number | null, boolean | undefined][]
type testSync3 = Expect<
  Equal<typeof syncResult3, [number | null, boolean | undefined][]>
>;

/**
 * Real-World Scenario:
 *
 * In an IoT backend project, you may receive asynchronous streams of data from multiple sensors,
 * such as temperature, humidity, and pressure. In order to analyze the data in sync,
 * you need to "zip" these streams together. The `synchronizeSensors` function allows you to combine
 * multiple arrays of sensor readings into a single array of tuples, where each tuple represents
 * the readings from all sensors at the same sampling time.
 */
