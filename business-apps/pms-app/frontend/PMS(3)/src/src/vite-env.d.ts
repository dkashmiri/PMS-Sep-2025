/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_ENV: string
  readonly VITE_AUTH_SERVICE_URL: string
  readonly VITE_WEBSOCKET_URL: string
  readonly VITE_SENTRY_DSN: string
  readonly VITE_ANALYTICS_ID: string
  readonly VITE_ENABLE_MOCK_API: string
  readonly VITE_DEBUG_MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}