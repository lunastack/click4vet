import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
export enum GenericErrorCodesEnum {
  GenericError = 'GenericError',
}
export const GenericErrorCodes = {
  InternalErrorException: {
    httpError: new InternalServerErrorException('INTERNAL_ERROR'),
  },
  NotAuthorizedException: {
    httpError: new UnauthorizedException('NOT_AUTHORIZED'),
  },
  GenericError: {
    httpError: new InternalServerErrorException('INTERNAL_SERVER_ERROR'),
  },
};
