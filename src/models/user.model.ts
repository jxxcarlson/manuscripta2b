
export class User {

  public id: number;
  public username: string;
  public token: string;

  constructor(data = {}) {
    Object.assign(this, data);
  }
}


