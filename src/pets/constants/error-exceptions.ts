import { ConflictException, NotFoundException } from '@nestjs/common';

export enum PetErrorCodesEnum {
  RUT_ALREADY_EXISTS = 'RUT_ALREADY_EXISTS',
}

export const PetErrorCodes = {
  RUT_ALREADY_EXISTS: {
    httpError: new ConflictException(
      PetErrorCodesEnum['RUT_ALREADY_EXISTS'],
    ),
  },
};
