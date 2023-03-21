type ConfigDatabase = {
  DATABASE_HOST: string | undefined;
  DATABASE_PORT: number | undefined;
  DATABASE_NAME: string | undefined;
  DATABASE_PASSWORD: string | undefined;
  DATABASE_USER: string | undefined;
};
type ConfigCache = {
  host: string;
  port: number;
};
type UserInfoGenerateToken = {
  username: string;
};
const TypeDatabase: Record<string, string> = {
  MYSQL: 'Mysql'
};

const HTTP_STATUS_CODE: Record<string, number> = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

const MessageOutServiceUnavailable: Record<string, string> = {
  SERVICE_UNAVAILABLE: 'Service Unavailable'
};
const MessageOutInternalServerError: Record<string, string> = {
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  NOT_SUPPORT_TYPE_DATABASE: 'Not Support Type Database'
};
const MessageAccountOutputNotFound: Record<string, string> = {
  USERNAME_NOT_FOUND: 'Username not found',
  USER_ID_NOT_FOUND: 'userId not found'
};
const MessageAccountBadRequest: Record<string, string> = {
  INVALID_LINK: 'Invalid link',
  INVALID_ACCESS_TOKEN: 'invalid access token',
  INVALID_CONFIRMATION:
    'Oops! Invalid confirmation link. Please confirm you entered the correct URL or click on the button below to resend the confirmation link.',
  INVALID_passwordRecovery_LINK:
    'Oops! Invalid password recovery link. Please confirm you entered the correct URL or click on the button below to resend the password recovery link.',
  INVALID_PASSWORD: 'Invalid password',
  INVALID_EMAIL: 'Invalid email',
  INVALID_REFRESH_TOKEN: 'Invalid refresh token',
  PASSWORD_CANNOT_UNDEFINE: 'password cannot undefine',
  EMAIL_CANNOT_UNDEFINE: 'email cannot undefine',
  ACCESS_TOKEN_CANNOT_UNDEFINE: 'accessToken cannot undefine',
  REFRESH_TOKEN_CANNOT_UNDEFINE: 'refresh_token_cannot undefine',
  USERNAME_CANNOT_UNDEFINE: 'username cannot undefine',
  USERNAME_ALREADY_EXISTS: 'username already exists',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  CONFIRMATION_ACCOUNT: 'Please confirmation account with email',
  NOT_FOUND_EMAIL_CONFIRM:
    'We are unable to locate your email address. Please make sure you enter the correct registered email.',
  TOO_MANY_REQUEST: 'Too many requests'
};
const MessageAccountSuccess: Record<string, string> = {
  SIGN_IN_SUCCESS: 'Sign in success',
  SIGN_OUT_SUCCESS: 'Sign out success',
  signUp_SUCCESS: 'Sign up success',
  TOKEN_REFRESH_SUCCESS: 'Token refresh success',
  CONFIRMATION_SUCCESS: 'Confirmation success',
  SENDED_EMAIL: 'Sended email',
  RESEND_CONFIRMATION_SUCCESS: 'Your confirmation email has been resent.',
  SEND_passwordRecovery_SUCCESS:
    'Your link password recovery has been resent.',
  GET_NEW_PASSOWRD_LINK_SUCCESS: 'This link is correct',
  UPDATED_NEW_PASSWORD: 'Updated new password',
  SUCCESS: "Success"
};
const SubjectEmail = 'Please confirm your email [Bomber games]';
const PREFIX_REDIS: Record<string, string> = {
  PREFIX_USERNAME: 'username',
  PREFIX_EMAIL: 'email'
};
export {
  ConfigDatabase,
  UserInfoGenerateToken,
  TypeDatabase,
  HTTP_STATUS_CODE,
  MessageOutInternalServerError,
  MessageAccountOutputNotFound,
  MessageAccountBadRequest,
  MessageAccountSuccess,
  MessageOutServiceUnavailable,
  SubjectEmail,
  ConfigCache,
  PREFIX_REDIS
};
