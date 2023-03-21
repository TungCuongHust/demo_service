import { MessageAccountBadRequest } from '../../../config/const';
class SignInInputDto {
  public username: string;
  public password: string;
  constructor(requestBody: Record<string, any>) {
    this.username = SignInInputDto.isValidUsername(requestBody['username']);
    this.password = SignInInputDto.isValidPassword(requestBody['password']);
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
}

class SignInOutputDto {
  public isSuccess: boolean;
  public message: string;
  public result: object;
  constructor(isSuccess: boolean, message: string, result: object) {
    this.isSuccess = isSuccess;
    this.message = message;
    this.result = result;
  }
}

export { SignInInputDto, SignInOutputDto };
