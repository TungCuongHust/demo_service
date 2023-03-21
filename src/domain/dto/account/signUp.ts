import { MessageAccountBadRequest } from '../../../config/const';
class SignUpInputDto {
  public username: string;
  public password: string;
  public email: string;
  constructor(requestBody: Record<string, any>) {
    this.username = SignUpInputDto.isValidUsername(requestBody['username']);
    this.password = SignUpInputDto.isValidPassword(requestBody['password']);
    this.email = SignUpInputDto.isValidEmail(requestBody['email']);
  }
  private static isValidUsername(username: string | undefined) {
    if (username === undefined) {
      throw Error(MessageAccountBadRequest.USERNAME_CANNOT_UNDEFINE);
    }
    if (typeof username !== 'string') {
      throw Error(MessageAccountBadRequest.INVALID_USERNAME);
    }
    return username;
  }
  private static isValidPassword(password: string | undefined) {
    if (password === undefined) {
      throw Error(MessageAccountBadRequest.PASSWORD_CANNOT_UNDEFINE);
    }
    if (typeof password !== 'string') {
      throw Error(MessageAccountBadRequest.INVALID_PASSWORD);
    }
    return password;
  }
  private static isValidEmail(email: string | undefined) {
    if (email === undefined) {
      throw Error(MessageAccountBadRequest.EMAIL_CANNOT_UNDEFINE);
    }
    if (typeof email !== 'string') {
      throw Error(MessageAccountBadRequest.INVALID_EMAIL);
    }
    return email;
  }
}

class SignUpOutputDto {
  public isSuccess: boolean;
  public message: string;
  constructor(isSuccess: boolean, message: string) {
    this.isSuccess = isSuccess;
    this.message = message;
  }
}

export { SignUpInputDto, SignUpOutputDto };
