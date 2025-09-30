import { Equal, Expect } from "..";

/**
 * Represents a sensor configuration.
 */
type Sensor = { type: string; readings: number[] };

type FilterSensors<SensorList, AllowedTypes> = TODO;

/**
 * Declares the `selectSensors` function that takes a tuple of sensor configurations
 * and an array of allowed sensor types, and returns a new tuple containing only
 * the sensors whose `type` property matches one of the allowed types.
 */
export declare function selectSensors<
  // Infer `Sensors` as a non-empty tuple of Sensor objects:
  Sensors extends [Sensor, ...Sensor[]],
  // AllowedTypes is a union of string literal types:
  AllowedTypes extends string
>(
  sensors: Sensors,
  allowedTypes: AllowedTypes[]
): FilterSensors<Sensors, AllowedTypes>;

// --- Example usage and type tests ---

// A sample sensor list as might be defined in an IoT backend system.
declare const sensorList: [
  { type: "temperature"; readings: number[] },
  { type: "humidity"; readings: number[] },
  { type: "pressure"; readings: number[] },
  { type: "temperature"; readings: number[] }
];

// Case 1: Select only temperature sensors.
const result1 = selectSensors(sensorList, ["temperature"]);
type Expected1 = [
  { type: "temperature"; readings: number[] },
  { type: "temperature"; readings: number[] }
];
type Test1 = Expect<Equal<typeof result1, Expected1>>;

// Case 2: Select humidity and pressure sensors.
const result2 = selectSensors(sensorList, ["humidity", "pressure"]);
type Expected2 = [
  { type: "humidity"; readings: number[] },
  { type: "pressure"; readings: number[] }
];
type Test2 = Expect<Equal<typeof result2, Expected2>>;

// Case 3: If no allowed sensor types are provided, return an empty tuple.
const result3 = selectSensors(sensorList, []);
type Expected3 = [];
type Test3 = Expect<Equal<typeof result3, Expected3>>;

/**
 * Real-world scenario:
 *
 * In an IoT backend project, sensors deployed in the field might send data
 * for various environmental parameters. A service may need to filter the raw sensor
 * configurations to process only certain types of data. For example, if you need to
 * monitor temperature trends exclusively, you can use `selectSensors` to extract only
 * the temperature sensor configurations from a larger sensor list.
 */
