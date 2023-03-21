import AccountAbstract from '../../repositories/account/accountAbstract';
import AccountCacheAbstract from '../../repositories/account/accountCacheAbtract';
import { hashMd5, hashBcrypt, sendEmail } from '../utils';
import Account from '../../entities/account';
import { INACTIVE_ACCOUNT_DELETION } from '../../../config/config';

class DeleteInactiveAccount {
  private database: AccountAbstract;
  constructor(database: AccountAbstract) {
    this.database = database;
  }
  async execute(): Promise<undefined> {
    const creationTime =
      Math.floor(Date.now() / 1000) - INACTIVE_ACCOUNT_DELETION.DELETION_TIME;
    const deletionAccounts: Array<Account> =
      await this.database.getInactiveAccountToRemove(creationTime);
    console.log(deletionAccounts);
    if (deletionAccounts.length === 0) {
      return;
    }
    await this.database.deleteInactiveAccount(creationTime);
    const usernames = [];
    const emails = [];
    for (let i = 0; i < deletionAccounts.length; ++i) {
      usernames.push(deletionAccounts[i].username);
      emails.push(deletionAccounts[i].email);
    }
    return;
  }
}

export { DeleteInactiveAccount };
