export interface User {
  id: number;
  username: string;
  password: string
  token: string;
  signedIn: boolean;
};

export const intialUser:User = {id: -1, username: 'nobody', password: '', token: '', signedIn: false}
