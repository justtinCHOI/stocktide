interface ImportMetaEnv {
  readonly VITE_WS_URL: string
  readonly VITE_API_URL: string;
  readonly VITE_CLIENT_URL: string;
  readonly HTTPS: string
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly SSR: boolean;
  readonly VITE_DEFAULT_LANGUAGE?: string;
  readonly VITE_REST_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.css';