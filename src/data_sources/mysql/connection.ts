import mysql = require('mysql');
import { ConfigDatabase } from '../../config/const';

class MysqlConnection {
  private static connection: any;
  private constructor() {
    throw Error('Cannot use constructor');
  }
  static async get_connection(configDatabase: ConfigDatabase): Promise<any> {
    if (!this.connection) {
      this.connection = mysql.createConnection({
        host: configDatabase.DATABASE_HOST,
        port: configDatabase.DATABASE_PORT,
        user: configDatabase.DATABASE_USER,
        password: configDatabase.DATABASE_PASSWORD,
        database: configDatabase.DATABASE_NAME
      });
      await this.connect_mysql(this.connection);
    }
    return this.connection;
  }
  public static connect_mysql(connect: any) {
    return new Promise((resolve, reject) => {
      connect.connect((error: any) => {
        if (error) {
          return reject(error);
        }
        return resolve('');
      });
    });
  }
}
export { MysqlConnection };
