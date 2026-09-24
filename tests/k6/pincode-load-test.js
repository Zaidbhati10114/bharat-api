import http from "k6/http";
import { check, sleep } from "k6";
import { BASE_URL, THRESHOLDS } from "./config.js";

export const options = {
  scenarios: {
    rps_certification: {
      executor: "constant-arrival-rate",
      rate: 100, // 100 requests/sec
      timeUnit: "1s",
      duration: "2m",
      preAllocatedVUs: 20,
      maxVUs: 100,
    },
  },
  thresholds: THRESHOLDS,
};

export default function () {
  const res = http.get(`${BASE_URL}/api/v1/pincode/421201`, {
    headers: {
      Accept: "application/json",
    },
  });

  check(res, {
    "status is 200": (r) => r.status === 200,
    "success=true": (r) => r.json("success") === true,
    "cache header exists": (r) =>
      !!(r.headers["cache-control"] || r.headers["Cache-Control"]),
    "etag header exists": (r) => !!(r.headers["etag"] || r.headers["ETag"]),
    "response under 200ms": (r) => r.timings.duration < 200,
  });

  // Simulate realistic client behavior
  sleep(1);
}
