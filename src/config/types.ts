export interface IConfigServer {
  api_url: string;
  token_name: string;
  google_client_id: string;
}

export interface IConfig {
  server: IConfigServer;
}
