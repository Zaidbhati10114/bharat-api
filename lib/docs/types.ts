export type HttpMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE";

export type ExampleLanguage =
    | "curl"
    | "javascript"
    | "python"
    | "typescript"
    | "go"
    | "java"
    | "csharp"
    | "php"
    | "ruby"
    | "swift";

export interface ApiDoc {
    title: string;
    description: string;

    endpoint: {
        method: HttpMethod;
        path: string;
        description: string;
    };

    examples: Partial<Record<ExampleLanguage, string>>;

    exampleResponse: string;

    errors: {
        status: number;
        code: string;
        description: string;
    }[];

    metadata: {
        version: string;
        lastUpdated: string;
        recordCount: number;
        source: string;
        cache: string;
        refreshCycle: string;
    };
}