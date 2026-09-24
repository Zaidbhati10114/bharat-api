import http from "k6/http";
import { check } from "k6";
import { BASE_URL, THRESHOLDS } from "./config.js";
export const options = {
  scenarios: {
    stress_250: {
      executor: "constant-arrival-rate",
      rate: 250,
      timeUnit: "1s",
      duration: "2m",

      preAllocatedVUs: 30,
      maxVUs: 100, // Keep within Grafana limit
    },
  },
  thresholds: THRESHOLDS,
};

export default function () {
  const res = http.get(`${BASE_URL}/api/v1/pincode/421201`);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "success=true": (r) => r.json("success") === true,
    "cache header exists": (r) =>
      !!(r.headers["cache-control"] || r.headers["Cache-Control"]),
    "etag header exists": (r) => !!(r.headers["etag"] || r.headers["ETag"]),
  });
}
