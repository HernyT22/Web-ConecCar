/// <reference types="vite/client" />

declare const __BUILD_YEAR__: number;

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
