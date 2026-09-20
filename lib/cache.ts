export const CACHE = {
    STATIC_API:
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",

    NO_STORE: "no-store",
} as const;