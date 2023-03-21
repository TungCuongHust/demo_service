import { SignOut } from './signOut';
import { SignIn } from './signIn';
import { SignUp } from './signUp';
import { TokenRefresh } from './tokenRefresh';
import AccountAbstract from '../../repositories/account/accountAbstract';
import AccountCacheAbstract from '../../repositories/account/accountCacheAbtract';
import { ConfirmAccount } from './confirmAccount';
import { ResendConfirmAccount } from './resendConfirmAccount';
import { PasswordRecovery } from './passwordRecovery';
import { GetNewPassword } from './getNewPassword';
import { UpdateNewPassword } from './updateNewPassword';
import { DeleteInactiveAccount } from './deleteInactiveAccount';
import { GetUserProfile } from './getUserProfile';
class UsecaseAccount {
  private static signIn: SignIn | undefined;
  private static signOut: SignOut | undefined;
  private static signUp: SignUp | undefined;
  private static tokenRefresh: TokenRefresh;
  private static confirmAccount: ConfirmAccount;
  private static resendConfirmAccount: ResendConfirmAccount;
  private static passwordRecovery: PasswordRecovery;
  private static getNewPassword: GetNewPassword;
  private static updateNewPassword: UpdateNewPassword;
  private static deleteInactiveAccount: DeleteInactiveAccount;
  private static getUserProfile: GetUserProfile
  private constructor() { }
  public static initialize(
    database: AccountAbstract,
  ): any {
    if (!this.signIn) {
      this.signIn = new SignIn(database);
    }
    if (!this.signOut) {
      this.signOut = new SignOut(database);
    }
    if (!this.signUp) {
      this.signUp = new SignUp(database);
    }
    if (!this.tokenRefresh) {
      this.tokenRefresh = new TokenRefresh(database);
    }
    if (!this.confirmAccount) {
      this.confirmAccount = new ConfirmAccount(database);
    }
    if (!this.resendConfirmAccount) {
      this.resendConfirmAccount = new ResendConfirmAccount(database);
    }
    if (!this.passwordRecovery) {
      this.passwordRecovery = new PasswordRecovery(database);
    }
    if (!this.getNewPassword) {
      this.getNewPassword = new GetNewPassword(database);
    }
    if (!this.updateNewPassword) {
      this.updateNewPassword = new UpdateNewPassword(database);
    }
    if (!this.deleteInactiveAccount) {
      this.deleteInactiveAccount = new DeleteInactiveAccount(database);
    }
    if (!this.getUserProfile) {
      this.getUserProfile = new GetUserProfile(database);
    }
    return [
      this.signIn,
      this.signOut,
      this.signUp,
      this.tokenRefresh,
      this.confirmAccount,
      this.resendConfirmAccount,
      this.passwordRecovery,
      this.getNewPassword,
      this.updateNewPassword,
      this.deleteInactiveAccount,
      this.getUserProfile
    ];
  }
}

export { UsecaseAccount };
