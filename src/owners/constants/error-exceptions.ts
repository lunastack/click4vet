import { ConflictException, NotFoundException } from '@nestjs/common';

export enum OwnerErrorCodesEnum {
  RUT_ALREADY_EXISTS = 'RUT_ALREADY_EXISTS',
}

export const OwnerErrorCodes = {
  RUT_ALREADY_EXISTS: {
    httpError: new ConflictException(
      OwnerErrorCodesEnum['RUT_ALREADY_EXISTS'],
    ),
  },
};
