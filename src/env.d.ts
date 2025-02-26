/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
    readonly BEEHIIV_API_KEY: string;
    readonly BEEHIIV_PUBLICATION_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}