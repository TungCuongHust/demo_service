import {
  HTTP_STATUS_CODE,
  MessageOutInternalServerError,
  MessageAccountOutputNotFound,
  MessageOutServiceUnavailable,
  MessageAccountBadRequest
} from '../../config/const';

const exceptionError = (
  response: any,
  messageError: any,
  outputDto: any
) => {
  if (Object.values(MessageOutInternalServerError).includes(messageError)) {
    return response
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json(Object.assign({}, new outputDto(false, messageError)));
  }
  if (Object.values(MessageOutServiceUnavailable).includes(messageError)) {
    return response
      .status(HTTP_STATUS_CODE.SERVICE_UNAVAILABLE)
      .json(Object.assign({}, new outputDto(false, messageError)));
  }
  if (Object.values(MessageAccountOutputNotFound).includes(messageError)) {
    return response
      .status(HTTP_STATUS_CODE.NOT_FOUND)
      .json(Object.assign({}, new outputDto(false, messageError)));
  }
  if (Object.values(MessageAccountBadRequest).includes(messageError)) {
    return response
      .status(HTTP_STATUS_CODE.BAD_REQUEST)
      .json(Object.assign({}, new outputDto(false, messageError)));
  }
  return response
    .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
    .json(
      Object.assign(
        {},
        new outputDto(
          false,
          MessageOutInternalServerError.INTERNAL_SERVER_ERROR
        )
      )
    );
};
const exceptionErrorStatus = (
  response: any,
  statusCode: number,
  messageError: any,
  outputDto: any
) => {
  return response
    .status(statusCode)
    .json(Object.assign({}, new outputDto(false, messageError)));
};
export { exceptionError, exceptionErrorStatus };
