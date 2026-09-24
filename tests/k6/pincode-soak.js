import http from "k6/http";
import { check } from "k6";
import { BASE_URL, THRESHOLDS } from "./config.js";

export const options = {
  scenarios: {
    soak: {
      executor: "constant-arrival-rate",
      rate: 100,
      timeUnit: "1s",
      duration: "10m",
      preAllocatedVUs: 20,
      maxVUs: 100,
      gracefulStop: "30s",
    },
  },
  thresholds: THRESHOLDS,
};

const pincodes = [
  "421201",
  "421204",
  "110001",
  "400001",
  "560001",
  "600001",
  "700001",
  "500001",
  "380001",
  "302001",
  "682001",
  "751001",
  "226001",
  "781001",
  "834001",
  "160017",
  "122001",
  "411001",
  "462001",
  "395003",
];

export default function () {
  const code = pincodes[Math.floor(Math.random() * pincodes.length)];

  const res = http.get(`${BASE_URL}/api/v1/pincode/${code}`, {
    headers: {
      Accept: "application/json",
    },
  });

  check(res, {
    "status is 200": (r) => r.status === 200,
    "success=true": (r) => r.json("success") === true,
    "cache header exists": (r) =>
      !!(
        r.headers["cache-control"] ||
        r.headers["Cache-Control"] ||
        r.headers["Cache-control"]
      ),
    "etag header exists": (r) =>
      !!(r.headers["etag"] || r.headers["ETag"] || r.headers["Etag"]),
    "response under 200ms": (r) => r.timings.duration < 200,
  });
}
