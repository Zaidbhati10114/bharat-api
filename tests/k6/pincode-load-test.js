import http from "k6/http";
import { check } from "k6";

const BASE_URL = "https://bharat-api-xi.vercel.app";

export const options = {
  scenarios: {
    production: {
      executor: "ramping-vus",
      stages: [
        { duration: "20s", target: 5 },
        { duration: "20s", target: 10 },
        { duration: "20s", target: 0 },
      ],
      gracefulRampDown: "30s",
    },
  },

  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500", "p(99)<1000"],
    checks: ["rate>0.99"],
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/api/v1/pincode/421201`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/140 Safari/537.36",
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br",
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

  if (res.status !== 200) {
    console.log(`Status: ${res.status}`);
    console.log(res.body.slice(0, 150));
  }
}
