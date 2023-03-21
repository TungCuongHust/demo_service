import { MessageAccountBadRequest } from '../../../config/const';
class ConfirmAccountInputDto {
  public email: string;
  public code: string;
  constructor(requestQuery: Record<string, any>) {
    this.email = ConfirmAccountInputDto.isValidEmail(requestQuery['email']);
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
}

class ConfirmAccountOutputDto {
  public isSuccess: boolean;
  public message: string;
  constructor(isSuccess: boolean, message: string) {
    this.isSuccess = isSuccess;
    this.message = message;
  }
}

export { ConfirmAccountInputDto, ConfirmAccountOutputDto };
