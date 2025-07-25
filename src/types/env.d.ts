export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_SERVER_PORT: string;
      NEXT_PUBLIC_BACKEND_SERVER_URL: string;
    }
  }
}
