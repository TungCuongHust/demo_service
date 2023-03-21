import AccountMysql from '../../../data_sources/mysql/account';
import AccountRedis from '../../../data_sources/redis/account';
import { UsecaseAccount } from '../../../domain/interactors/account';
import {
  ConfigDatabase,
  ConfigCache,
  TypeDatabase,
  MessageOutInternalServerError
} from '../../../config/const';
import {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER,
  CACHE_HOST,
  CACHE_PORT
} from '../../../config/config';
class UsecaseAccountInjector {
  private static accountRepository: any;
  private static accountRepositoryCache: any;
  private static supportedDatabase = Object.values(TypeDatabase);

  public static getConsumter(type_database: string): any {
    if (!this.supportedDatabase.includes(type_database)) {
      throw new Error(MessageOutInternalServerError.NOT_SUPPORT_TYPE_DATABASE);
    }
    if (type_database == TypeDatabase.MYSQL) {
      const configDatabase: ConfigDatabase = {
        DATABASE_HOST: DATABASE_HOST,
        DATABASE_PORT: +DATABASE_PORT,
        DATABASE_NAME: DATABASE_NAME,
        DATABASE_USER: DATABASE_USER,
        DATABASE_PASSWORD: DATABASE_PASSWORD
      };
      console.log(configDatabase)
      const configCache: ConfigCache = {
        host: CACHE_HOST,
        port: CACHE_PORT
      };
      this.accountRepository = new AccountMysql(configDatabase);
      this.accountRepositoryCache = new AccountRedis(configCache);
      const [
        signIn,
        signOut,
        signUp,
        tokenRefresh,
        confirmAccount,
        resendConfirmAccount,
        passwordRecovery,
        getNewPassword,
        updateNewPassword,
        deleteInactiveAccount,
        getUserProfile
      ] = UsecaseAccount.initialize(
        this.accountRepository,
      );
      return [
        signIn,
        signOut,
        signUp,
        tokenRefresh,
        confirmAccount,
        resendConfirmAccount,
        passwordRecovery,
        getNewPassword,
        updateNewPassword,
        deleteInactiveAccount,
        getUserProfile
      ];
    }
  }
}

export { UsecaseAccountInjector };
