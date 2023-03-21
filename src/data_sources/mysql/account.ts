import AccountAbstract from '../../domain/repositories/account/accountAbstract';
import Account from '../../domain/entities/account';
import { MysqlConnection } from './connection';
import {
  ConfigDatabase,
  MessageOutInternalServerError
} from '../../config/const';

class Accounts extends AccountAbstract {
  private connection: any;
  private configDatabase: ConfigDatabase;
  constructor(configDatabase: ConfigDatabase) {
    super();
    this.configDatabase = configDatabase;
    this.set_connection();
  }
  private async set_connection() {
    this.connection = await MysqlConnection.get_connection(
      this.configDatabase
    );
  }
  query_mysql(connect: any, sql_query: string): any {
    return new Promise((resolve, reject) => {
      connect.query(sql_query, (err: any, result: any) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }
  async insertAccount(
    username: string,
    email: string,
    password: string
  ): Promise<undefined> {
    const confirmedAccount = false;
    const accessToken = '';
    const refreshToken = '';
    const creationTime = Math.floor(Date.now() / 1000);
    const sql = `INSERT INTO accounts (username, email, password, confirmedAccount, accessToken, refreshToken, creationTime) VALUES ('${username}', '${email}', '${password}', ${confirmedAccount}, '${accessToken}', '${refreshToken}', ${creationTime})`;
    const result = await this.query_mysql(this.connection, sql);
    if (result.affectedRows === 0) {
      throw Error(MessageOutInternalServerError.INTERNAL_SERVER_ERROR);
    }
    return;
  }
  async getAccountWithUsername(
    username: string
  ): Promise<Account | undefined> {
    const sql = `SELECT * FROM accounts WHERE username = '${username}'`;
    const result = await this.query_mysql(this.connection, sql);
    if (result.length === 0) {
      return;
    }
    return new Account(
      result[0].id,
      result[0].username,
      result[0].email,
      result[0].password,
      result[0].confirmedAccount,
      result[0].accessToken,
      result[0].refreshToken,
      result[0].creationTime
    );
  }
  async getAccountWithEmail(email: string): Promise<Account | undefined> {
    const sql = `SELECT * FROM accounts WHERE email = '${email}'`;
    const result = await this.query_mysql(this.connection, sql);
    if (result.length === 0) {
      return;
    }
    return new Account(
      result[0].userId,
      result[0].username,
      result[0].email,
      result[0].password,
      result[0].confirmedAccount,
      result[0].accessToken,
      result[0].refreshToken,
      result[0].creationTime
    );
  }
  async updateAccessTokenRefreshToken(
    username: string,
    accessToken: string,
    refreshToken: string
  ): Promise<undefined> {
    const sql = `UPDATE accounts SET accessToken = '${accessToken}', refreshToken = '${refreshToken}' WHERE username = '${username}'`;
    const result = await this.query_mysql(this.connection, sql);
    if (result.affectedRows === 0) {
      throw Error(MessageOutInternalServerError.INTERNAL_SERVER_ERROR);
    }
    return;
  }
  async updateConfirmAccount(
    username: string,
    confirmedAccount: boolean
  ): Promise<undefined> {
    const sql = `UPDATE accounts SET confirmedAccount = ${confirmedAccount} WHERE username = '${username}'`;
    const result = await this.query_mysql(this.connection, sql);
    if (result.affectedRows === 0) {
      throw Error(MessageOutInternalServerError.INTERNAL_SERVER_ERROR);
    }
    return;
  }
  async updatePasswordWithUsername(
    username: string,
    newPassword: string
  ): Promise<undefined> {
    const sql = `UPDATE accounts SET password = '${newPassword}' WHERE username = '${username}'`;
    const result = await this.query_mysql(this.connection, sql);
    if (result.affectedRows === 0) {
      throw Error(MessageOutInternalServerError.INTERNAL_SERVER_ERROR);
    }
    return;
  }
  async deleteInactiveAccount(creationTime: number): Promise<undefined> {
    const confirmedAccount = false;
    const sql = `DELETE FROM accounts WHERE confirmedAccount = ${confirmedAccount} and creationTime <= ${creationTime}`;
    const result = await this.query_mysql(this.connection, sql);
    if (result.affectedRows === 0) {
      throw Error(MessageOutInternalServerError.INTERNAL_SERVER_ERROR);
    }
    return;
  }
  async getInactiveAccountToRemove(
    creationTime: number
  ): Promise<Array<Account>> {
    const confirmedAccount = false;
    const sql = `SELECT * FROM accounts WHERE confirmedAccount = ${confirmedAccount} and creationTime <= ${creationTime}`;
    const result = await this.query_mysql(this.connection, sql);
    const deletionAccounts = [];
    for (let i = 0; i < result.length; ++i) {
      deletionAccounts.push(
        new Account(
          result[i].userId,
          result[i].username,
          result[i].email,
          result[i].password,
          result[i].confirmedAccount,
          result[i].accessToken,
          result[i].refreshToken,
          result[i].creationTime
        )
      );
    }
    return deletionAccounts;
  }
  async getUserById(userId: number): Promise<Account> {
    const sql = `SELECT * FROM accounts WHERE id = ${userId}`;
    const result = await this.query_mysql(this.connection, sql);
    return new Account(
      result[0].userId,
      result[0].username,
      result[0].email,
      result[0].password,
      result[0].confirmedAccount,
      result[0].accessToken,
      result[0].refreshToken,
      result[0].creationTime
    );
  }
}

export = Accounts;
