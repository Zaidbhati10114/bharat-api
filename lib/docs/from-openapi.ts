import {
    getCodeSamples,
    getErrors,
    getExample,
    getPath,
} from "@/lib/openapi";
import { pincodeDoc } from "./pincode";
import { ApiDoc, ExampleLanguage } from "./types";

const PATH = "/api/v1/pincode/{code}";

const languageMap: Record<string, ExampleLanguage> = {
    cURL: "curl",
    curl: "curl",
    JavaScript: "javascript",
    TypeScript: "typescript",
    Python: "python",
    Go: "go",
    Java: "java",
    "C#": "csharp",
    PHP: "php",
    Ruby: "ruby",
    Swift: "swift",
};

export function getPincodeDoc(): ApiDoc {
    const endpoint = getPath(PATH);

    if (!endpoint?.get) return pincodeDoc;

    const samples = getCodeSamples(PATH);

    const examples: Partial<Record<ExampleLanguage, string>> = {
        ...pincodeDoc.examples,
    };

    for (const sample of samples) {
        const key = languageMap[sample.lang];

        if (key) {
            examples[key] = sample.source;
        }
    }

    return {
        ...pincodeDoc,

        sections: pincodeDoc.sections,
        metadata: pincodeDoc.metadata,

        title: endpoint.get.summary ?? pincodeDoc.title,
        description: endpoint.get.description ?? pincodeDoc.description,

        endpoint: {
            method: "GET",
            path: PATH,
            description:
                endpoint.get.description ?? pincodeDoc.endpoint.description,
        },

        examples,

        exampleResponse: JSON.stringify(
            getExample(PATH) ?? JSON.parse(pincodeDoc.exampleResponse),
            null,
            2
        ),

        errors: getErrors(PATH).map((error) => ({
            status: error.status,
            code: error.example?.error?.code ?? `HTTP_${error.status}`,
            description: error.description,
        })),
    };
}