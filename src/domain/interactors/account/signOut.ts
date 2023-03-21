import AccountAbstract from '../../repositories/account/accountAbstract';
import AccountCacheAbstract from '../../repositories/account/accountCacheAbtract';
import Account from '../../entities/account';
import { SignOutInputDto, SignOutOutputDto } from '../../dto/account';
import {
  MessageAccountBadRequest,
  MessageAccountOutputNotFound,
  MessageAccountSuccess
} from '../../../config/const';
import { SECRET_HASH_TOKEN } from '../../../config/config';
import jwt = require('jsonwebtoken');

class SignOut {
  private database: AccountAbstract;
  constructor(database: AccountAbstract) {
    this.database = database;
  }

  async execute(inputDto: SignOutInputDto): Promise<SignOutOutputDto> {
    let { username } = await this.verifyToken(inputDto.accessToken);
    username = this.isValidUsername(username);
    let account = await this.database.getAccountWithUsername(username);
    if (account === undefined) {
      throw Error(MessageAccountOutputNotFound.USERNAME_NOT_FOUND);
    }
    if (inputDto.accessToken !== account.accessToken) {
      throw Error(MessageAccountBadRequest.INVALID_ACCESS_TOKEN);
    }
    await this.database.updateAccessTokenRefreshToken(username, '', '');
    return new SignOutOutputDto(true, MessageAccountSuccess.SIGN_OUT_SUCCESS);
  }
  private isValidUsername(username: any) {
    if (username === undefined) {
      throw Error(MessageAccountBadRequest.USERNAME_CANNOT_UNDEFINE);
    }
    if (typeof username !== 'string') {
      throw Error(MessageAccountBadRequest.INVALID_USERNAME);
    }
    return username;
  }
  private verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, SECRET_HASH_TOKEN, function (err: any, decoded: any) {
        if (err) {
          throw Error(MessageAccountBadRequest.INVALID_ACCESS_TOKEN);
        }
        return resolve(decoded);
      });
    });
  }
}

export { SignOut };
