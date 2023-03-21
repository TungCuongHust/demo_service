import AccountAbstract from '../../repositories/account/accountAbstract';
import AccountCacheAbstract from '../../repositories/account/accountCacheAbtract';
import Account from '../../entities/account';
import { TokenRefreshInputDto, TokenRefreshOutputDto } from '../../dto/account';
import {
  SECRET_HASH_TOKEN,
  TOKEN_LIFE,
  REFRESH_TOKEN_SECRET
} from '../../../config/config';
import {
  MessageAccountSuccess,
  MessageAccountBadRequest,
  UserInfoGenerateToken,
  MessageAccountOutputNotFound
} from '../../../config/const';
import jwt = require('jsonwebtoken');

class TokenRefresh {
  private database: AccountAbstract;
  constructor(database: AccountAbstract) {
    this.database = database;
  }
  public async execute(
    inputDto: TokenRefreshInputDto
  ): Promise<TokenRefreshOutputDto> {
    let { username } = await this.verifyToken(inputDto.refreshToken);
    username = this.isValidUsername(username);
    let account = await this.database.getAccountWithUsername(username);
    if (account === undefined) {
      throw Error(MessageAccountOutputNotFound.USERNAME_NOT_FOUND);
    }
    if (account.refreshToken !== inputDto.refreshToken) {
      throw Error(MessageAccountBadRequest.INVALID_REFRESH_TOKEN);
    }
    const user_info: UserInfoGenerateToken = { username };
    const accessToken = this.generateAccessToken(user_info);
    await this.database.updateAccessTokenRefreshToken(
      account.username,
      accessToken,
      account.refreshToken
    );
    const result = { accessToken };
    return new TokenRefreshOutputDto(
      true,
      MessageAccountSuccess.TOKEN_REFRESH_SUCCESS,
      result
    );
  }

  private verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        REFRESH_TOKEN_SECRET,
        function (err: any, decoded: any) {
          if (err) {
            console.log(err);
            throw Error(MessageAccountBadRequest.INVALID_REFRESH_TOKEN);
          }
          return resolve(decoded);
        }
      );
    });
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
  private generateAccessToken(user_info: UserInfoGenerateToken) {
    return jwt.sign(user_info, SECRET_HASH_TOKEN, {
      algorithm: 'HS256',
      expiresIn: TOKEN_LIFE
    });
  }
}

export { TokenRefresh };
