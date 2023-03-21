class Account {
  userId: number
  username: string;
  email: string;
  password: string;
  confirmedAccount: boolean;
  accessToken: string;
  refreshToken: string;
  creationTime: number;
  constructor(
    userId: number,
    username: string,
    email: string,
    password: string,
    confirmedAccount: boolean,
    accessToken: string,
    refreshToken: string,
    creationTime: number
  ) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.confirmedAccount = confirmedAccount;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.creationTime = creationTime;
  }
}
export default Account;
