import http from "k6/http";
import { check } from "k6";

const BASE_URL = "https://bharat-api-xi.vercel.app";

export const options = {
  scenarios: {
    production: {
      executor: "ramping-vus",
      stages: [
        { duration: "30s", target: 10 },
        { duration: "1m", target: 50 },
        { duration: "2m", target: 100 },
        { duration: "30s", target: 0 },
      ],
      gracefulRampDown: "30s",
    },
  },

  thresholds: {
    checks: ["rate>0.99"],
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500", "p(99)<1000"],
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/api/v1/pincode/421201`, {
    headers: {
      Accept: "application/json",
    },
  });

  check(res, {
    "status is 200": (r) => r.status === 200,
    "success=true": (r) => {
      try {
        return r.json("success") === true;
      } catch {
        return false;
      }
    },
    "cache header exists": (r) => r.headers["Cache-Control"] !== undefined,
    "response under 500ms": (r) => r.timings.duration < 500,
  });
}
