export type ExampleLanguage =
    | "curl"
    | "javascript"
    | "typescript"
    | "python"
    | "go"
    | "java"
    | "csharp"
    | "php"
    | "ruby"
    | "swift";

export interface DocSection {
    id: string;
    title: string;
    icon?: string;
}
export interface ApiMetadata {
    recordCount: number;
    lastUpdated: string;
    refreshCycle: string;
    version: string;
    source: string;
    cache: string;
}

export interface ApiDoc {
    title: string;
    description: string;

    sections: DocSection[];

    metadata: ApiMetadata;

    endpoint: {
        method: string;
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
}