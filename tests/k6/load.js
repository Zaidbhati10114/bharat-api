import http from "k6/http";
import { check } from "k6";

import { BASE_URL, THRESHOLDS } from "./config.js";
import { validateApiResponse } from "./helpers.js";

export const options = {
  scenarios: {
    load_test: {
      executor: "ramping-vus",
      stages: [
        { duration: "30s", target: 25 },
        { duration: "30s", target: 50 },
        { duration: "30s", target: 100 },
        { duration: "30s", target: 100 },
      ],
      gracefulRampDown: "10s",
    },
  },
  thresholds: THRESHOLDS,
};

export default function () {
  const res = http.get(`${BASE_URL}/api/v1/pincode/421201`);

  validateApiResponse(res);

  check(res, {
    "response under 1s": (r) => r.timings.duration < 1000,
  });
}
