import { CommonAbstract } from './commonAbstract';

abstract class AccountAbstract extends CommonAbstract {
  abstract updateAccountInfo(
    username: string,
    email: string,
    password: string,
    confirmedAccount: boolean,
    accessToken: string,
    refreshToken: string,
    creationTime: number
  ): Promise<undefined>;
  abstract deleteInactiveAccount(
    usernames: Array<string>,
    emails: Array<string>
  ): Promise<undefined>;
}
export default AccountAbstract;
