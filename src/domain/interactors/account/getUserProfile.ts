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
    MessageAccountOutputNotFound,
    MessageAccountSuccess
} from '../../../config/const';
import { SECRET_NEW_PASSWORD_CREATION } from '../../../config/config';
import { GetUserProfileInputDto, GetUserProfileOutputDto } from '../../dto/account/getUserProfile';

class GetUserProfile {
    private database: AccountAbstract;
    constructor(database: AccountAbstract) {
        this.database = database;
    }

    async execute(
        inputDto: GetUserProfileInputDto
    ): Promise<GetUserProfileOutputDto> {
        let account = await this.database.getUserById(inputDto.userId);
        if (account === undefined) {
            throw Error(MessageAccountOutputNotFound.USER_ID_NOT_FOUND);
        }
        return new GetUserProfileOutputDto(
            true,
            MessageAccountSuccess.SUCCESS,
            account
        );
    }
}

export { GetUserProfile };
