import { GenericErrorCodesEnum } from '@core/constants/error-exceptions';

export const checkErrorCodes = <T>(enumValus: T, value: string) => {
  const isValid = Object.keys(enumValus!)
    .map((key) => enumValus[key])
    .includes(value);
    console.log("value" ,value);
    console.log("isValid" ,isValid);
    
  return isValid ? value : GenericErrorCodesEnum.GenericError;
};
