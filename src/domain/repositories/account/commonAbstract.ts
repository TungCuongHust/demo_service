import Account from '../../entities/account';

abstract class CommonAbstract {
  abstract insertAccount(
    username: string,
    email: string,
    password: string
  ): Promise<undefined>;
  abstract getAccountWithUsername(
    username: string
  ): Promise<Account | undefined>;
  abstract getAccountWithEmail(email: string): Promise<Account | undefined>;
}

export { CommonAbstract };
