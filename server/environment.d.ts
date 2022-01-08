declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URL: string;
            CLIENT_ID: string;
        }
    }
}
  
export {}
  