import { IConfig } from "./types";

const config: IConfig = {
  server: {
    api_url: process.env.NEXT_BACKEND_URL || "",
    token_name: process.env.NEXT_PUBLIC_TOKEN_NAME || "",
    google_client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
  },
};

export default config;
