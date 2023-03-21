import AccountAbstract from '../../repositories/account/accountAbstract';
import AccountCacheAbstract from '../../repositories/account/accountCacheAbtract';
import { hashMd5, hashBcrypt, sendEmail } from '../utils';
import { SignUpInputDto, SignUpOutputDto } from '../../dto/account';
import Account from '../../entities/account';
import {
  SECRET_ACCOUNT_CONFIRM,
  URL_CONFIRM_ACCOUNT
} from '../../../config/config';
import {
  MessageAccountSuccess,
  MessageAccountBadRequest,
  SubjectEmail
} from '../../../config/const';

class SignUp {
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
  async execute(inputDto: SignUpInputDto): Promise<SignUpOutputDto> {
    const accountFromUsername = await this.database.getAccountWithUsername(
      inputDto.username
    );
    if (accountFromUsername !== undefined) {
      throw Error(MessageAccountBadRequest.USERNAME_ALREADY_EXISTS);
    }
    let accountFromEmail = await this.database.getAccountWithEmail(
      inputDto.email
    );
    if (accountFromEmail !== undefined) {
      throw Error(MessageAccountBadRequest.EMAIL_ALREADY_EXISTS);
    }
    const hashed_password = await hashBcrypt(inputDto.password);
    await this.database.insertAccount(
      inputDto.username,
      inputDto.email,
      hashed_password
    );
    this.sendLinkConfirmAccount(inputDto.email, inputDto.username);
    return new SignUpOutputDto(true, MessageAccountSuccess.signUp_SUCCESS);
  }
}

export { SignUp };
