import Account from '../../entities/account';
import { CommonAbstract } from './commonAbstract';

abstract class AccountAbstract extends CommonAbstract {
  abstract updateConfirmAccount(
    username: string,
    confirmedAccount: boolean
  ): Promise<undefined>;
  abstract updateAccessTokenRefreshToken(
    username: string,
    accessToken: string,
    refreshToken: string
  ): Promise<undefined>;
  abstract updatePasswordWithUsername(
    username: string,
    newPassword: string
  ): Promise<undefined>;
  abstract deleteInactiveAccount(creationTime: number): Promise<undefined>;
  abstract getInactiveAccountToRemove(
    creationTime: number
  ): Promise<Array<Account>>;
  abstract getUserById(userId: number): Promise<Account>
}
export default AccountAbstract;
