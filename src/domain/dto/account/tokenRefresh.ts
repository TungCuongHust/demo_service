import { MessageAccountBadRequest } from '../../../config/const';
class TokenRefreshInputDto {
  public refreshToken: string;
  constructor(requestBody: Record<string, any>) {
    this.refreshToken = TokenRefreshInputDto.isValidRefreshToken(
      requestBody['refreshToken']
    );
  }
  private static isValidRefreshToken(refreshToken: string | undefined) {
    if (refreshToken === undefined) {
      throw Error(MessageAccountBadRequest.REFRESH_TOKEN_CANNOT_UNDEFINE);
    }
    if (typeof refreshToken !== 'string' || refreshToken === '') {
      throw Error(MessageAccountBadRequest.INVALID_REFRESH_TOKEN);
    }
    return refreshToken;
  }
}

class TokenRefreshOutputDto {
  public isSuccess: boolean;
  public message: string;
  public result: object;
  constructor(isSuccess: boolean, message: string, result: object) {
    this.isSuccess = isSuccess;
    this.message = message;
    this.result = result;
  }
}

export { TokenRefreshInputDto, TokenRefreshOutputDto };
