import AccountAbstract from '../../repositories/account/accountAbstract';
import AccountCacheAbstract from '../../repositories/account/accountCacheAbtract';
import Account from '../../entities/account';
import { hashBcrypt, sendEmail } from '../utils';
import {
  PasswordRecoveryInputDto,
  PasswordRecoveryOutputDto
} from '../../dto/account';
import {
  MessageAccountBadRequest,
  MessageAccountSuccess,
  SubjectEmail
} from '../../../config/const';

import {
  URL_GET_NEW_PASSWORD,
  SECRET_NEW_PASSWORD_CREATION
} from '../../../config/config';

class PasswordRecovery {
  private database: AccountAbstract;
  constructor(database: AccountAbstract) {
    this.database = database;
  }
  async sendNewPasswordCreationLink(
    email: string,
    username: string
  ): Promise<undefined> {
    const link = await this.createNewPasswordLink(email, username);
    const content = `
      Creation new password link : ${link}
    `;
    await sendEmail(email, SubjectEmail, content);
    return;
  }
  private async createNewPasswordLink(email: string, username: string) {
    const init_timestamp = Date.now();
    const expireTimestamp = init_timestamp + 24 * 60 * 60 * 1000;
    const input =
      email +
      username +
      expireTimestamp.toString() +
      SECRET_NEW_PASSWORD_CREATION;
    const code = await hashBcrypt(input);
    const link = `${URL_GET_NEW_PASSWORD}?email=${email}&expireTimestamp=${expireTimestamp}&code=${code}`;
    return link;
  }
  async execute(
    inputDto: PasswordRecoveryInputDto
  ): Promise<PasswordRecoveryOutputDto> {
    let account = await this.database.getAccountWithEmail(inputDto.email);
    if (account === undefined) {
      throw Error(MessageAccountBadRequest.NOT_FOUND_EMAIL_CONFIRM);
    }
    this.sendNewPasswordCreationLink(inputDto.email, account.username);
    return new PasswordRecoveryOutputDto(
      true,
      MessageAccountSuccess.SEND_passwordRecovery_SUCCESS
    );
  }
}

export { PasswordRecovery };
