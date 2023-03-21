import * as dotenv from 'dotenv';
dotenv.config();
const URL_GET_NEW_PASSWORD =
  process.env.URL_GET_NEW_PASSWORD ||
  'http://127.0.0.1:8000/api/v1/accounts/newPassword';
const URL_CONFIRM_ACCOUNT =
  process.env.URL_CONFIRM_ACCOUNT ||
  'http://127.0.0.1:8000/api/v1/accounts/confirmAccount';
const SECRET_ACCOUNT_CONFIRM =
  process.env.SECRET_ACCOUNT_CONFIRM || '123@123';
const SECRET_NEW_PASSWORD_CREATION =
  process.env.SECRET_NEW_PASSWORD_CREATION || '123@123';
const SECRET_HASH_TOKEN = process.env.SECRET_HASH_TOKEN || '123@123';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '123@123';
const TOKEN_LIFE = process.env.TOKEN_LIFE
  ? parseInt(process.env.TOKEN_LIFE)
  : 15 * 60;
const REFRESH_TOKEN_LIFE = process.env.REFRESH_TOKEN_LIFE
  ? parseInt(process.env.REFRESH_TOKEN_LIFE)
  : 24 * 60 * 60;
const DATABASE_HOST = process.env.DATABASE_HOST || '127.0.0.1';
const DATABASE_PORT = process.env.DATABASE_PORT || 3307;
const DATABASE_NAME = process.env.DATABASE_NAME || 'demo_database';
const DATABASE_USER = process.env.DATABASE_USER || 'root';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '123456';
const CACHE_HOST = process.env.CACHE_HOST || 'localhost';
const CACHE_PORT = process.env.CACHE_PORT
  ? parseInt(process.env.CACHE_PORT)
  : 6379;
const LIMIT_SIZE_DATA = process.env.LIMIT_SIZE_DATA || '300kb';
const EMAIL_SETTING: Record<string, string> = {
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'abc@gmail.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'abc',
  MAIL_HOST: process.env.MAIL_HOST || 'smtp.gmail.com',
  MAIL_PORT: process.env.MAIL_PORT || '587'
};
const SERVER_PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const CONFIG_LIMITER_TOKEN_REFRESH: Record<string, number> = {
  LIMIT_TIME_TOKEN_REFRESH: process.env.LIMIT_TIME_TOKEN_REFRESH
    ? parseInt(process.env.LIMIT_TIME_TOKEN_REFRESH)
    : 1 * 60 * 1000,
  LIMIT_REQUEST_TOKEN_REFRESH: process.env.LIMIT_REQUEST_TOKEN_REFRESH
    ? parseInt(process.env.LIMIT_REQUEST_TOKEN_REFRESH)
    : 100
};
const CONFIG_LIMITER_signUp: Record<string, number> = {
  limit_time_signUp: process.env.LIMIT_TIME_TOKEN_REFRESH
    ? parseInt(process.env.LIMIT_TIME_TOKEN_REFRESH)
    : 15 * 60 * 1000,
  limit_request_signUp: process.env.LIMIT_REQUEST_signUp
    ? parseInt(process.env.LIMIT_REQUEST_signUp)
    : 100
};
const CONFIG_LIMITER_COMMON: Record<string, number> = {
  LIMIT_TIME_COMMON: process.env.LIMIT_TIME_COMMON
    ? parseInt(process.env.LIMIT_TIME_COMMON)
    : 1 * 60 * 1000,
  LIMIT_REQUEST_COMMON: process.env.LIMIT_REQUEST_COMMON
    ? parseInt(process.env.LIMIT_REQUEST_COMMON)
    : 3000
};
const INACTIVE_ACCOUNT_DELETION: Record<string, number> = {
  DELETION_TIME: process.env.INACTIVE_ACCOUNT_DELETION_TIME
    ? parseInt(process.env.INACTIVE_ACCOUNT_DELETION_TIME)
    : 15 * 24 * 60 * 60,
  DELETION_SCHEDULE: process.env.INACTIVE_ACCOUNT_DELETETION_SCHEDULE
    ? parseInt(process.env.INACTIVE_ACCOUNT_DELETETION_SCHEDULE)
    : 1 * 24 * 60 * 60 * 1000
};
export {
  URL_GET_NEW_PASSWORD,
  URL_CONFIRM_ACCOUNT,
  SECRET_ACCOUNT_CONFIRM,
  SECRET_NEW_PASSWORD_CREATION,
  SECRET_HASH_TOKEN,
  REFRESH_TOKEN_SECRET,
  TOKEN_LIFE,
  REFRESH_TOKEN_LIFE,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  CACHE_HOST,
  CACHE_PORT,
  EMAIL_SETTING,
  LIMIT_SIZE_DATA,
  SERVER_PORT,
  CONFIG_LIMITER_TOKEN_REFRESH,
  CONFIG_LIMITER_signUp,
  CONFIG_LIMITER_COMMON,
  INACTIVE_ACCOUNT_DELETION
};
