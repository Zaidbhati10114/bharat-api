import { check } from "k6";

/**
 * Validates BharatAPI's standard response contract.
 */
export function validateApiResponse(res) {
  return check(res, {
    "status is 200": (r) => r.status === 200,
    "success=true": (r) => r.json("success") === true,
    "meta exists": (r) => !!r.json("meta"),
    "requestId exists": (r) => !!r.json("meta.requestId"),
    "version exists": (r) => !!r.json("meta.version"),
    "timestamp exists": (r) => !!r.json("meta.timestamp"),
    "cache header exists": (r) => r.headers["Cache-Control"] !== undefined,
  });
}

/**
 * Validates a successful lookup returned data.
 */
export function validatePincodeResponse(res) {
  return check(res, {
    "pincode exists": (r) => !!r.json("data.pincode"),
    "state exists": (r) => !!r.json("data.state"),
    "districts exist": (r) => Array.isArray(r.json("data.districts")),
  });
}

export function logUnexpectedResponse(res) {
  if (res.status !== 200) {
    console.log(`Status: ${res.status}`);
    console.log(res.body.substring(0, 200));
  }
}
