import { MessageAccountBadRequest } from '../../../config/const';
class SignOutInputDto {
  public accessToken: string;
  constructor(requestBody: Record<string, any>) {
    this.accessToken = SignOutInputDto.isValidAccessToken(
      requestBody['accessToken']
    );
  }
  private static isValidAccessToken(accessToken: string | undefined) {
    if (accessToken === undefined) {
      throw Error(MessageAccountBadRequest.ACCESS_TOKEN_CANNOT_UNDEFINE);
    }
    if (typeof accessToken !== 'string' || accessToken === '') {
      throw Error(MessageAccountBadRequest.INVALID_ACCESS_TOKEN);
    }
    return accessToken;
  }
}

class SignOutOutputDto {
  public isSuccess: boolean;
  public message: string;
  constructor(isSuccess: boolean, message: string) {
    this.isSuccess = isSuccess;
    this.message = message;
  }
}

export { SignOutInputDto, SignOutOutputDto };
