import AccountCacheAbstract from '../../domain/repositories/account/accountCacheAbtract';
import Account from '../../domain/entities/account';
import { RedisConnection } from './connection';
import { INACTIVE_ACCOUNT_DELETION } from '../../config/config';
import { ConfigCache, PREFIX_REDIS } from '../../config/const';

class Accounts extends AccountCacheAbstract {
  private connection: any;
  private configCache: ConfigCache;
  constructor(configCache: ConfigCache) {
    super();
    this.configCache = configCache;
    this.set_connection();
  }
  private set_connection() {
    this.connection = RedisConnection.get_connection(this.configCache);
  }
  set_redis(connect: any, key: string, value: string): any {
    return new Promise((resolve, reject) => {
      connect.set(key, value, (err: any, result: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }
  get_redis(connect: any, key: string): any {
    return new Promise((resolve, reject) => {
      connect.get(key, (err: any, result: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }
  delete_redis(connect: any, key: string): any {
    return new Promise((resolve, reject) => {
      connect.del(key, (err: any, result: any) => {
        if (err) {
          console.log('Error of redis: ', err);
        }
        return resolve(result);
      });
    });
  }
  async insertAccount(
    username: string,
    email: string,
    password: string
  ): Promise<undefined> {
    try {
      const confirmedAccount = false;
      const accessToken = '';
      const refreshToken = '';
      const key_username = PREFIX_REDIS.PREFIX_USERNAME + username;
      const key_email = PREFIX_REDIS.PREFIX_EMAIL + email;
      const creationTime = Math.floor(Date.now() / 1000);
      const value = JSON.stringify({
        username,
        email,
        password,
        confirmedAccount,
        accessToken,
        refreshToken,
        creationTime
      });
      await this.set_redis(this.connection, key_username, value);
      await this.set_redis(this.connection, key_email, value);
      return;
    } catch (error) {
      console.log('Error of redis: ', error);
      return;
    }
  }
  async getAccountWithUsername(
    username: string
  ): Promise<Account | undefined> {
    try {
      const key_username = PREFIX_REDIS.PREFIX_USERNAME + username;
      let result = await this.get_redis(this.connection, key_username);
      if (result) {
        result = JSON.parse(result);
        return new Account(
          result.userId,
          result.username,
          result.email,
          result.password,
          result.confirmedAccount,
          result.accessToken,
          result.refreshToken,
          result.creationTime
        );
      }
      return;
    } catch (error) {
      console.log('Error of redis: ', error);
      return;
    }
  }
  async getAccountWithEmail(email: string): Promise<Account | undefined> {
    try {
      const key_email = PREFIX_REDIS.PREFIX_EMAIL + email;
      let result = await this.get_redis(this.connection, key_email);
      if (result) {
        result = JSON.parse(result);
        return new Account(
          result.userId,
          result.username,
          result.email,
          result.password,
          result.confirmedAccount,
          result.accessToken,
          result.refreshToken,
          result.creationTime
        );
      }
      return;
    } catch (error) {
      console.log('Error of redis: ', error);
      return;
    }
  }
  async updateAccountInfo(
    username: string,
    email: string,
    password: string,
    confirmedAccount: boolean,
    accessToken: string,
    refreshToken: string,
    creationTime: number
  ): Promise<undefined> {
    try {
      const key_username = PREFIX_REDIS.PREFIX_USERNAME + username;
      const key_email = PREFIX_REDIS.PREFIX_EMAIL + email;
      const value = JSON.stringify({
        username: username,
        email: email,
        password: password,
        confirmedAccount: confirmedAccount,
        accessToken: accessToken,
        refreshToken: refreshToken,
        creationTime: creationTime
      });
      await this.set_redis(this.connection, key_username, value);
      await this.set_redis(this.connection, key_email, value);
      return;
    } catch (error) {
      console.log('Error of redis: ', error);
      return;
    }
  }
  async deleteInactiveAccount(
    usernames: Array<string>,
    emails: Array<string>
  ): Promise<undefined> {
    for (let i = 0; i < usernames.length; ++i) {
      const key_username = PREFIX_REDIS.PREFIX_USERNAME + usernames[i];
      await this.delete_redis(this.connection, key_username);
    }
    for (let i = 0; i < emails.length; ++i) {
      const key_email = PREFIX_REDIS.PREFIX_EMAIL + emails[i];
      await this.delete_redis(this.connection, key_email);
    }
    return;
  }
}

export = Accounts;
