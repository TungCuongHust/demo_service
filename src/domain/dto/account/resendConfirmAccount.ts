import { MessageAccountBadRequest } from '../../../config/const';
class ResendConfirmAccountInputDto {
  public email: string;
  constructor(requestBody: Record<string, any>) {
    this.email = ResendConfirmAccountInputDto.isValidEmail(
      requestBody['email']
    );
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

class ResendConfirmAccountOutputDto {
  public isSuccess: boolean;
  public message: string;
  constructor(isSuccess: boolean, message: string) {
    this.isSuccess = isSuccess;
    this.message = message;
  }
}

export { ResendConfirmAccountInputDto, ResendConfirmAccountOutputDto };
