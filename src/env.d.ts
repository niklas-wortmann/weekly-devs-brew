/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
    readonly BEEHIIV_API_KEY: string;
    readonly BEEHIIV_PUBLICATION_ID: string;
    readonly BEEHIIV_PUBLICATION_STATUS?: "confirmed" | "all";
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}