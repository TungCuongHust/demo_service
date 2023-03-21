import redis = require('redis');
import { ConfigCache } from '../../config/const';

class RedisConnection {
  private static connection: any;
  private constructor() { }
  static get_connection(configCache: ConfigCache): redis.RedisClient {
    if (!this.connection) {
      this.connection = redis.createClient({
        host: configCache.host,
        port: configCache.port
      });
    }
    return this.connection;
  }
}
export { RedisConnection };
