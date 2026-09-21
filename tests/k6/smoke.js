import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 1,
  iterations: 10,
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export default function () {
  const res = http.get(`${BASE_URL}/api/v1/pincode/421201`);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "success=true": (r) => r.json("success") === true,
    "requestId exists": (r) => !!r.json("meta.requestId"),
    "cache header exists": (r) => r.headers["Cache-Control"] !== undefined,
    "response under 200ms": (r) => r.timings.duration < 200,
  });
}
