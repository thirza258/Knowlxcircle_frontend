/// <reference types="vite/client" />

// Augments the interface declared by vite/client so `import.meta.env` is typed
// rather than implicitly `any` under `strict`.
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
}
