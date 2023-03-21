import { MessageAccountBadRequest } from '../../../config/const';
class GetNewPasswordInputDto {
  public email: string;
  public expireTimestamp: number;
  public code: string;
  constructor(requestQuery: Record<string, any>) {
    this.email = GetNewPasswordInputDto.isValidEmail(requestQuery['email']);
    this.expireTimestamp = GetNewPasswordInputDto.isValidExpireTimestamp(
      requestQuery['expireTimestamp']
    );
    this.code = requestQuery['code'];
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

class GetNewPasswordOutputDto {
  public isSuccess: boolean;
  public message: string;
  constructor(isSuccess: boolean, message: string) {
    this.isSuccess = isSuccess;
    this.message = message;
  }
}

export { GetNewPasswordInputDto, GetNewPasswordOutputDto };
