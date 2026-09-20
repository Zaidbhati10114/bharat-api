export const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export const THRESHOLDS = {
  http_req_failed: ["rate<0.01"],
  http_req_duration: ["p(95)<1000"],
};

export const COMMON_HEADERS = {
  "Content-Type": "application/json",
};
