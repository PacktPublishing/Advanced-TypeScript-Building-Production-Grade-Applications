import { Equal, Expect } from "..";

/**
 * Utility type to extract the type of a property from an object,
 * or return a fallback type if the property does not exist.
 */
type GetPropertyOrFallback<Key, Obj, Fallback> = Key extends keyof Obj
  ? Obj[Key]
  : Fallback;

/**
 * Function to retrieve a configuration value from a settings object.
 * Returns the value associated with the provided key if it exists;
 * otherwise, it returns the fallback value.
 *
 * @param key - The configuration key to retrieve.
 * @param settings - The configuration object.
 * @param fallback - The fallback value if the key is missing.
 * @returns The value from the settings or the fallback.
 */
function getConfigValue<K extends string, O extends {}, F>(
  key: K,
  settings: O,
  fallback: F
): GetPropertyOrFallback<K, O, F> {
  return (settings as any)[key] ?? fallback;
}

// A sample configuration object for a server.
const serverConfig = {
  host: "127.0.0.1",
  port: 8000,
  secure: true,
} as const;

// If the key exists, the value's type is returned.
// Otherwise, the fallback type is used.

// Case 1: The key "host" exists.
const host = getConfigValue("host", serverConfig, "localhost");
type test1 = Expect<Equal<typeof host, "127.0.0.1">>;

// Case 2: The key "mode" does not exist.
const mode = getConfigValue("mode", serverConfig, "production");
type test2 = Expect<Equal<typeof mode, "production">>;

// Case 3: The key "port" exists.
const port = getConfigValue("port", serverConfig, 3000);
type test3 = Expect<Equal<typeof port, 8000>>;

// Case 4: The key "debug" does not exist.
const debug = getConfigValue("debug", serverConfig, false);
type test4 = Expect<Equal<typeof debug, false>>;
