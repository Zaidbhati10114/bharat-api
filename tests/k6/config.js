// Shared configuration for all BharatAPI k6 tests.

export const BASE_URL =
  __ENV.BASE_URL || "https://bharat-api.zaidbhati007.workers.dev";

export const THRESHOLDS = {
  http_req_failed: ["rate<0.01"],

  // Cloudflare should easily meet these.
  http_req_duration: ["p(95)<200", "p(99)<500"],

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
