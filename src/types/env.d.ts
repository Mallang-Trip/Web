declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
    NEXT_PUBLIC_GTM_ID?: string;
  }
}

export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_SERVER_PORT: string;
      NEXT_PUBLIC_BACKEND_SERVER_URL: string;
    }
  }
}
