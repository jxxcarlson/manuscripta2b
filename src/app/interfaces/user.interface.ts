export interface User {
  id: number;
  username: string;
  password: string
  token: string;
  rawToken: string
  signedIn: boolean;
};
