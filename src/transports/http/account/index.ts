import { TypeDatabase, HTTP_STATUS_CODE } from '../../../config/const';
import { INACTIVE_ACCOUNT_DELETION } from '../../../config/config';
import { UsecaseAccountInjector } from './injector';
import {
  SignInInputDto,
  SignInOutputDto,
  SignOutInputDto,
  SignOutOutputDto,
  SignUpInputDto,
  SignUpOutputDto,
  TokenRefreshInputDto,
  TokenRefreshOutputDto,
  ConfirmAccountInputDto,
  ConfirmAccountOutputDto,
  ResendConfirmAccountInputDto,
  ResendConfirmAccountOutputDto,
  PasswordRecoveryInputDto,
  PasswordRecoveryOutputDto,
  GetNewPasswordInputDto,
  GetNewPasswordOutputDto,
  UpdateNewPasswordInputDto,
  UpdateNewPasswordOutputDto
} from '../../../domain/dto/account';

import express from 'express';
import { exceptionError } from '../exception';
import { GetUserProfileInputDto } from '../../../domain/dto/account/getUserProfile';
const [
  signIn,
  signOut,
  signUp,
  tokenRefresh,
  confirmAccount,
  resendConfirmAccount,
  passwordRecovery,
  getNewPassword,
  updateNewPassword,
  deleteInactiveAccount,
  getUserProfile
] = UsecaseAccountInjector.getConsumter(TypeDatabase.MYSQL);
const accountRouter = express.Router();
accountRouter.post('/signIn', async (req, res) => {
  try {
    const inputDto: SignInInputDto = new SignInInputDto(req.body);
    const signInOutputDto: SignInOutputDto = await signIn.execute(
      inputDto
    );
    return res
      .status(HTTP_STATUS_CODE.OK)
      .json(Object.assign({}, signInOutputDto));
  } catch (error: any) {
    console.log(error);
    return exceptionError(res, error.message, SignInOutputDto);
  }
});

accountRouter.post('/signOut', async (req, res) => {
  try {
    const inputDto: SignOutInputDto = new SignOutInputDto(req.body);
    const signOutOutputDto: SignOutOutputDto = await signOut.execute(
      inputDto
    );
    res
      .status(HTTP_STATUS_CODE.OK)
      .json(Object.assign({}, signOutOutputDto));
  } catch (error: any) {
    console.log(error);
    return exceptionError(res, error.message, SignOutOutputDto);
  }
});

accountRouter.post(
  '/token/refresh',
  async (req, res) => {
    try {
      const inputDto: TokenRefreshInputDto = new TokenRefreshInputDto(
        req.body
      );
      const tokenRefreshOutputDto: TokenRefreshOutputDto =
        await tokenRefresh.execute(inputDto);
      res
        .status(HTTP_STATUS_CODE.OK)
        .json(Object.assign({}, tokenRefreshOutputDto));
    } catch (error: any) {
      console.log(error);
      return exceptionError(res, error.message, TokenRefreshOutputDto);
    }
  }
);

accountRouter.post('/signUp', async (req, res) => {
  try {
    const inputDto: SignUpInputDto = new SignUpInputDto(req.body);
    const signUpOutputDto: SignUpOutputDto = await signUp.execute(
      inputDto
    );
    res.status(HTTP_STATUS_CODE.OK).json(Object.assign({}, signUpOutputDto));
  } catch (error: any) {
    console.log(error);
    return exceptionError(res, error.message, SignUpOutputDto);
  }
});

accountRouter.get('/confirmAccount', async (req, res) => {
  try {
    const inputDto: ConfirmAccountInputDto = new ConfirmAccountInputDto(
      req.query
    );
    const confirmAccountOutputDto: ConfirmAccountOutputDto =
      await confirmAccount.execute(inputDto);
    res
      .status(HTTP_STATUS_CODE.OK)
      .json(Object.assign({}, confirmAccountOutputDto));
  } catch (error: any) {
    console.log(error);
    return exceptionError(res, error.message, ConfirmAccountOutputDto);
  }
});
accountRouter.post(
  '/resendConfirmAccount',
  async (req, res) => {
    try {
      const inputDto: ResendConfirmAccountInputDto =
        new ResendConfirmAccountInputDto(req.body);
      const confirmAccountOutputDto: ResendConfirmAccountOutputDto =
        await resendConfirmAccount.execute(inputDto);
      res
        .status(HTTP_STATUS_CODE.OK)
        .json(Object.assign({}, confirmAccountOutputDto));
    } catch (error: any) {
      console.log(error);
      return exceptionError(res, error.message, ResendConfirmAccountOutputDto);
    }
  }
);
accountRouter.post('/passwordRecovery', async (req, res) => {
  try {
    const inputDto: PasswordRecoveryInputDto = new PasswordRecoveryInputDto(
      req.body
    );
    const passwordRecoveryOutputDto: PasswordRecoveryOutputDto =
      await passwordRecovery.execute(inputDto);
    res
      .status(HTTP_STATUS_CODE.OK)
      .json(Object.assign({}, passwordRecoveryOutputDto));
  } catch (error: any) {
    console.log(error);
    return exceptionError(res, error.message, PasswordRecoveryOutputDto);
  }
});
accountRouter.get('/newPassword', async (req, res) => {
  try {
    const inputDto: GetNewPasswordInputDto = new GetNewPasswordInputDto(
      req.query
    );
    const get_new_password_output_dto: GetNewPasswordOutputDto =
      await getNewPassword.execute(inputDto);
    res
      .status(HTTP_STATUS_CODE.OK)
      .json(Object.assign({}, get_new_password_output_dto));
  } catch (error: any) {
    console.log(error);
    return exceptionError(res, error.message, GetNewPasswordOutputDto);
  }
});
accountRouter.put('/newPassword', async (req, res) => {
  try {
    const inputDto: UpdateNewPasswordInputDto = new UpdateNewPasswordInputDto(
      req.query,
      req.body
    );
    const updateNewPasswordOutputDto: UpdateNewPasswordOutputDto =
      await updateNewPassword.execute(inputDto);
    res
      .status(HTTP_STATUS_CODE.OK)
      .json(Object.assign({}, updateNewPasswordOutputDto));
  } catch (error: any) {
    console.log(error);
    return exceptionError(res, error.message, UpdateNewPasswordOutputDto);
  }
});

accountRouter.get('/getUserProfile/:userId', async (req, res) => {
  try {
    const inputDto: GetUserProfileInputDto = new GetUserProfileInputDto(
      +req.params.userId
    );
    const userProfileOutputDTO: GetUserProfileInputDto =
      await getUserProfile.execute(inputDto);
    return res
      .status(HTTP_STATUS_CODE.OK)
      .json(Object.assign({}, userProfileOutputDTO));
  } catch (error: any) {
    console.log(error);
    return exceptionError(res, error.message, GetUserProfileInputDto);
  }
});
setInterval(() => {
  deleteInactiveAccount.execute();
}, INACTIVE_ACCOUNT_DELETION.DELETION_SCHEDULE);
export { accountRouter };
