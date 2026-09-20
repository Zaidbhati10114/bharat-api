import { mockPincodeData } from "@/components/landing/mock-pinocode";
import { ApiDoc } from "./types";
import metadata from "@/data/pincode/metadata.json";
export const pincodeDoc: ApiDoc = {
    title: "Pincode API",
    metadata: {
        ...metadata,
        recordCount: Object.keys(mockPincodeData).length,
    },

    description:
        "Fast Indian PIN code lookup powered by BharatAPI's optimized postal dataset.",

    endpoint: {
        method: "GET",
        path: "/api/v1/pincode/:code",
        description:
            "Retrieve location details for any valid 6-digit Indian PIN code.",
    },

    examples: {
        curl: `curl https://bharatapi.dev/api/v1/pincode/421201`,

        javascript: `const res = await fetch(
  "https://bharatapi.dev/api/v1/pincode/421201"
);

const data = await res.json();

console.log(data);`,



        python: `import requests

response = requests.get(
  "https://bharatapi.dev/api/v1/pincode/421201"
)

print(response.json())`,
    },

    exampleResponse: `{
  "success": true,
  "data": {
    "pincode": "421201",
    "state": "Maharashtra",
    "district": "Thane",
    "blocks": ["Dombivli"]
  }
}`,

    errors: [
        {
            status: 400,
            code: "INVALID_PINCODE",
            description: "PIN code must contain exactly six digits.",
        },
        {
            status: 404,
            code: "PINCODE_NOT_FOUND",
            description: "No matching record exists for the supplied PIN code.",
        },
    ],
};