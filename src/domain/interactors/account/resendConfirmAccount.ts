import AccountAbstract from '../../repositories/account/accountAbstract';
import AccountCacheAbstract from '../../repositories/account/accountCacheAbtract';
import Account from '../../entities/account';
import { hashMd5, sendEmail } from '../utils';
import {
  ResendConfirmAccountInputDto,
  ResendConfirmAccountOutputDto
} from '../../dto/account';
import {
  MessageAccountBadRequest,
  MessageAccountSuccess,
  SubjectEmail
} from '../../../config/const';

import {
  SECRET_ACCOUNT_CONFIRM,
  URL_CONFIRM_ACCOUNT
} from '../../../config/config';

class ResendConfirmAccount {
  private database: AccountAbstract;
  constructor(database: AccountAbstract) {
    this.database = database;
  }
  async sendLinkConfirmAccount(
    email: string,
    username: string
  ): Promise<undefined> {
    const link = this.createLinkConfirmation(email, username);
    const content = `
      Confirmation Link : ${link}
    `;
    await sendEmail(email, SubjectEmail, content);
    return;
  }
  private createLinkConfirmation(email: string, username: string) {
    const input = email + username + SECRET_ACCOUNT_CONFIRM;
    const code = hashMd5(input);
    const link = `${URL_CONFIRM_ACCOUNT}?email=${email}&code=${code}`;
    return link;
  }
  async execute(
    inputDto: ResendConfirmAccountInputDto
  ): Promise<ResendConfirmAccountOutputDto> {
    let account = await this.database.getAccountWithEmail(inputDto.email);
    if (account === undefined) {
      throw Error(MessageAccountBadRequest.NOT_FOUND_EMAIL_CONFIRM);
    }
    this.sendLinkConfirmAccount(inputDto.email, account.username);
    return new ResendConfirmAccountOutputDto(
      true,
      MessageAccountSuccess.RESEND_CONFIRMATION_SUCCESS
    );
  }
}

export { ResendConfirmAccount };
