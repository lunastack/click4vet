import { GenericErrorCodes } from '@core/constants/error-exceptions';

export const getHttpError = <T>(error, errorCodes: T) => {
  return errorCodes[error.message]
    ? errorCodes[error.message].httpError
    : GenericErrorCodes['GenericError'].httpError;
};
