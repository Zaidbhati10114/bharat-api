// Shared configuration for all BharatAPI k6 tests.

export const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export const THRESHOLDS = {
  http_req_failed: ["rate<0.01"],

  // 95% of requests should finish within 1 second.
  http_req_duration: ["p(95)<1000"],

  // At least 99% of checks should pass.
  checks: ["rate>0.99"],
};

export const STAGES = {
  load: [
    { duration: "30s", target: 25 },
    { duration: "30s", target: 50 },
    { duration: "30s", target: 100 },
    { duration: "30s", target: 100 },
  ],

  spike: [
    { duration: "10s", target: 10 },
    { duration: "10s", target: 300 },
    { duration: "20s", target: 300 },
    { duration: "20s", target: 10 },
  ],

  stress: [
    { duration: "30s", target: 100 },
    { duration: "30s", target: 250 },
    { duration: "30s", target: 500 },
    { duration: "30s", target: 750 },
    { duration: "30s", target: 1000 },
  ],

  soak: [
    { duration: "5m", target: 50 },
    { duration: "10m", target: 50 },
    { duration: "5m", target: 0 },
  ],
};
