import { Equal, Expect } from "..";

/**
 * Implement an `assembleConfig` generic that takes a tuple
 * containing configuration object types and merges all of them.
 */
declare function assembleConfig<
  // Infer Configs as a tuple of configuration objects:
  Configs extends [{}, ...{}[]]
>(...configs: Configs): ComposeConfigs<Configs>;

/**
 * ComposeConfigs recursively "reduces" a tuple of configuration objects
 * by intersecting (merging) them into one single configuration type.
 */
type ComposeConfigs<Configs, Accumulated = {}> = Configs extends [
  infer First,
  ...infer Rest
]
  ? ComposeConfigs<Rest, Accumulated & First>
  : Accumulated;

// --- Usage Examples ---

// Example 1: Merging two partial configurations
const serverConfig1 = assembleConfig(
  { host: "localhost", port: 8080 },
  { debug: true }
);
type ExpectedConfig1 = { host: string; port: number; debug: boolean };
type TestConfig1 = Expect<Equal<typeof serverConfig1, ExpectedConfig1>>;

// Example 2: Merging three configuration objects
const serverConfig2 = assembleConfig(
  { protocol: "https" as const },
  { host: "api.example.com" },
  { endpoint: "/v1" }
);
type ExpectedConfig2 = { protocol: "https"; host: string; endpoint: string };
type TestConfig2 = Expect<Equal<typeof serverConfig2, ExpectedConfig2>>;

// Example 3: Single configuration object remains unchanged.
const serverConfig3 = assembleConfig({ appName: "MyServer", version: "1.0" });
type ExpectedConfig3 = { appName: string; version: string };
type TestConfig3 = Expect<Equal<typeof serverConfig3, ExpectedConfig3>>;

// --- Real-World Example in a Backend Context ---

/**
 * Function to initialize server settings.
 * This function might combine configuration details from environment variables,
 * a configuration file, and default settings.
 */
function initializeServerConfig() {
  const envConfig = { port: 3000, debug: false };
  const fileConfig = { host: "127.0.0.1", debug: true };
  const defaultConfig = { protocol: "http" as const };

  const finalConfig = assembleConfig(defaultConfig, fileConfig, envConfig);
  console.log("Final Server Config:", finalConfig);
  return finalConfig;
}

initializeServerConfig();
// Expected console output (types not shown at runtime):
// Final Server Config: { protocol: "http", host: "127.0.0.1", port: 3000, debug: false }
