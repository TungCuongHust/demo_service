class PasswordRecoveryInputDto {
  public email: string;
  constructor(requestBody: Record<string, any>) {
    this.email = requestBody['email'];
  }
}

class PasswordRecoveryOutputDto {
  public isSuccess: boolean;
  public message: string;
  constructor(isSuccess: boolean, message: string) {
    this.isSuccess = isSuccess;
    this.message = message;
  }
}

export { PasswordRecoveryInputDto, PasswordRecoveryOutputDto };
