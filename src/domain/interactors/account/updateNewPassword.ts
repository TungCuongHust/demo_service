import AccountAbstract from '../../repositories/account/accountAbstract';
import AccountCacheAbstract from '../../repositories/account/accountCacheAbtract';
import Account from '../../entities/account';
import { verifyPassword, hashBcrypt } from '../utils';
import {
  UpdateNewPasswordInputDto,
  UpdateNewPasswordOutputDto
} from '../../dto/account';
import {
  MessageAccountBadRequest,
  MessageAccountSuccess
} from '../../../config/const';
import { SECRET_NEW_PASSWORD_CREATION } from '../../../config/config';

class UpdateNewPassword {
  private database: AccountAbstract;
  constructor(database: AccountAbstract) {
    this.database = database;
  }

  async execute(
    inputDto: UpdateNewPasswordInputDto
  ): Promise<UpdateNewPasswordOutputDto> {

    let account = await this.database.getAccountWithEmail(inputDto.email);
    if (account === undefined) {
      throw Error(MessageAccountBadRequest.INVALID_LINK);
    }

    const isCorrectAccount = await this.verifyInfo(
      inputDto.email,
      account.username,
      inputDto.expireTimestamp,
      inputDto.code
    );
    if (!isCorrectAccount) {
      throw Error(MessageAccountBadRequest.INVALID_LINK);
    }
    const hashed_new_password = await hashBcrypt(inputDto.newPassword);
    await this.database.updatePasswordWithUsername(
      account.username,
      hashed_new_password
    );
    return new UpdateNewPasswordOutputDto(
      true,
      MessageAccountSuccess.UPDATED_NEW_PASSWORD
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

export { UpdateNewPassword };
