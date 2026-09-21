import fs from "fs";
import path from "path";
import yaml from "yaml";

let cachedSpec: any;

export interface OpenApiCodeSample {
    lang: string;
    source: string;
}


function loadSpec() {
    if (cachedSpec) return cachedSpec;

    const file = fs.readFileSync(
        path.join(process.cwd(), "openapi.yaml"),
        "utf8"
    );

    cachedSpec = yaml.parse(file);
    return cachedSpec;
}

export function getOpenApiSpec() {
    return loadSpec();
}

export function getPath(pathName: string) {
    return loadSpec().paths?.[pathName];
}

export function getSchema(name: string) {
    return loadSpec().components?.schemas?.[name];
}

export function getInfo() {
    return loadSpec().info;
}

export function getCodeSamples(
    pathName: string,
    method: "get" | "post" = "get"
): OpenApiCodeSample[] {
    return (
        loadSpec().paths?.[pathName]?.[method]?.["x-codeSamples"] ?? []
    );
}
export function getExample(
    pathName: string,
    method: "get" | "post" = "get"
) {
    return (
        loadSpec().paths?.[pathName]?.[method]?.responses?.["200"]?.content?.[
            "application/json"
        ]?.example ?? null
    );
}

export function getErrors(
    pathName: string,
    method: "get" | "post" = "get"
) {
    const responses = loadSpec().paths?.[pathName]?.[method]?.responses ?? {};

    return Object.entries(responses)
        .filter(([status]) => status !== "200")
        .map(([status, response]: any) => ({
            status: Number(status),
            description: response.description,
            example:
                response.content?.["application/json"]?.example ?? null,
        }));
}