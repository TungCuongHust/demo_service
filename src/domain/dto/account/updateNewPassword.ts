import { MessageAccountBadRequest } from '../../../config/const';
class UpdateNewPasswordInputDto {
  public email: string;
  public expireTimestamp: number;
  public code: string;
  public newPassword: string;
  constructor(
    requestQuery: Record<string, any>,
    requestBody: Record<string, any>
  ) {
    this.email = UpdateNewPasswordInputDto.isValidEmail(
      requestQuery['email']
    );
    this.expireTimestamp = UpdateNewPasswordInputDto.isValidExpireTimestamp(
      requestQuery['expireTimestamp']
    );
    this.code = requestQuery['code'];
    this.newPassword = UpdateNewPasswordInputDto.isValidPassword(
      requestBody['newPassword']
    );
  }
  private static isValidEmail(email: string | undefined) {
    if (email === undefined) {
      throw Error(MessageAccountBadRequest.INVALID_CONFIRMATION);
    }
    if (typeof email !== 'string') {
      throw Error(MessageAccountBadRequest.INVALID_CONFIRMATION);
    }
    return email;
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
  private static isValidExpireTimestamp(
    expireTimestamp: string | undefined
  ): number {
    if (expireTimestamp === undefined) {
      throw Error(MessageAccountBadRequest.INVALID_CONFIRMATION);
    }
    if (isNaN(parseInt(expireTimestamp))) {
      throw Error(MessageAccountBadRequest.INVALID_CONFIRMATION);
    }
    return parseInt(expireTimestamp);
  }
}

class UpdateNewPasswordOutputDto {
  public isSuccess: boolean;
  public message: string;
  constructor(isSuccess: boolean, message: string) {
    this.isSuccess = isSuccess;
    this.message = message;
  }
}

export { UpdateNewPasswordInputDto, UpdateNewPasswordOutputDto };
