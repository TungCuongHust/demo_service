import { MessageAccountBadRequest } from '../../../config/const';
class GetUserProfileInputDto {
  public userId: number;
  constructor(userId: number) {
    this.userId = userId;
  }
}

class GetUserProfileOutputDto {
  public isSuccess: boolean;
  public message: string;
  public result: object;
  constructor(isSuccess: boolean, message: string, result: object) {
    this.isSuccess = isSuccess;
    this.message = message;
    this.result = result;
  }
}

export { GetUserProfileInputDto, GetUserProfileOutputDto };
