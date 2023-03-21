import AccountAbstract from '../../repositories/account/accountAbstract';
import AccountCacheAbstract from '../../repositories/account/accountCacheAbtract';
import Account from '../../entities/account';
import { hashMd5 } from '../utils';
import {
  ConfirmAccountInputDto,
  ConfirmAccountOutputDto
} from '../../dto/account';
import {
  MessageAccountBadRequest,
  MessageAccountSuccess
} from '../../../config/const';
import { SECRET_ACCOUNT_CONFIRM } from '../../../config/config';

class ConfirmAccount {
  private database: AccountAbstract;
  constructor(database: AccountAbstract) {
    this.database = database;
  }

  async execute(
    inputDto: ConfirmAccountInputDto
  ): Promise<ConfirmAccountOutputDto> {
    let account = await this.database.getAccountWithEmail(inputDto.email);
    if (account === undefined) {
      throw Error(MessageAccountBadRequest.INVALID_CONFIRMATION);
    }
    const isCorrectAccount = this.verifyAccount(
      inputDto.email,
      account.username,
      inputDto.code
    );
    if (!isCorrectAccount) {
      throw Error(MessageAccountBadRequest.INVALID_CONFIRMATION);
    }
    await this.database.updateConfirmAccount(
      account.username,
      isCorrectAccount
    );
    return new ConfirmAccountOutputDto(
      true,
      MessageAccountSuccess.CONFIRMATION_SUCCESS
    );
  }
  private verifyAccount(
    email: string,
    username: string,
    code: string
  ): boolean {
    const input = email + username + SECRET_ACCOUNT_CONFIRM;
    if (code !== hashMd5(input)) {
      return false;
    }
    return true;
  }
}

export { ConfirmAccount };
