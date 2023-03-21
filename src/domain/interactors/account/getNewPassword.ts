import AccountAbstract from '../../repositories/account/accountAbstract';
import AccountCacheAbstract from '../../repositories/account/accountCacheAbtract';
import Account from '../../entities/account';
import { verifyPassword } from '../utils';
import {
  GetNewPasswordInputDto,
  GetNewPasswordOutputDto
} from '../../dto/account';
import {
  MessageAccountBadRequest,
  MessageAccountSuccess
} from '../../../config/const';
import { SECRET_NEW_PASSWORD_CREATION } from '../../../config/config';

class GetNewPassword {
  private database: AccountAbstract;
  constructor(database: AccountAbstract) {
    this.database = database;
  }

  async execute(
    inputDto: GetNewPasswordInputDto
  ): Promise<GetNewPasswordOutputDto> {
    let account = await this.database.getAccountWithEmail(inputDto.email);
    if (account === undefined) {
      throw Error(MessageAccountBadRequest.INVALID_passwordRecovery_LINK);
    }
    const isCorrectAccount = await this.verifyInfo(
      inputDto.email,
      account.username,
      inputDto.expireTimestamp,
      inputDto.code
    );
    if (!isCorrectAccount) {
      throw Error(MessageAccountBadRequest.INVALID_passwordRecovery_LINK);
    }
    return new GetNewPasswordOutputDto(
      true,
      MessageAccountSuccess.GET_NEW_PASSOWRD_LINK_SUCCESS
    );
  }
  private async verifyInfo(
    email: string,
    username: string,
    expireTimestamp: number,
    code: string
  ): Promise<boolean> {
    const input =
      email +
      username +
      expireTimestamp.toString() +
      SECRET_NEW_PASSWORD_CREATION;
    const isSuccess = await verifyPassword(input, code);
    if (!isSuccess) {
      return false;
    }
    return true;
  }
}

export { GetNewPassword };
