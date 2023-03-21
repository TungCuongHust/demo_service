import AccountAbstract from '../../repositories/account/accountAbstract';
import { SignInInputDto, SignInOutputDto } from '../../dto/account';
import { verifyPassword } from '../utils';
import {
  SECRET_HASH_TOKEN,
  TOKEN_LIFE,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_LIFE
} from '../../../config/config';
import {
  MessageAccountBadRequest,
  MessageAccountSuccess,
  MessageAccountOutputNotFound
} from '../../../config/const';
import jwt = require('jsonwebtoken');

class SignIn {
  private database: AccountAbstract;
  constructor(database: AccountAbstract) {
    this.database = database;
  }
  public async execute(inputDto: SignInInputDto): Promise<SignInOutputDto> {
    let account = await this.database.getAccountWithUsername(
      inputDto.username
    );
    if (account === undefined) {
      throw Error(MessageAccountOutputNotFound.USERNAME_NOT_FOUND);
    }
    const isSuccess = await verifyPassword(
      inputDto.password,
      account.password
    );
    if (!isSuccess) {
      return new SignInOutputDto(
        isSuccess,
        MessageAccountBadRequest.INVALID_PASSWORD,
        {}
      );
    }
    if (!account.confirmedAccount) {
      throw Error(MessageAccountBadRequest.CONFIRMATION_ACCOUNT);
    }
    const user_info = { username: account.username };
    const accessToken = jwt.sign(user_info, SECRET_HASH_TOKEN, {
      algorithm: 'HS256',
      expiresIn: TOKEN_LIFE
    });
    const refreshToken = jwt.sign(user_info, REFRESH_TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: REFRESH_TOKEN_LIFE
    });
    await this.database.updateAccessTokenRefreshToken(
      account.username,
      accessToken,
      refreshToken
    );
    const result = { accessToken, refreshToken };
    return new SignInOutputDto(
      isSuccess,
      MessageAccountSuccess.SIGN_IN_SUCCESS,
      result
    );
  }
}

export { SignIn };
