const STATUS = {
  PENDING: "Request is pending.",
  FAILED: "Request failed.",
  SUCCESS: "Request was successful",
} as const;

type StatusObj = typeof STATUS;

type Status = StatusObj[keyof StatusObj];

export {};
