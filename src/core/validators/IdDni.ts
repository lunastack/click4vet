import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validateRut } from '@fdograph/rut-utilities';

@ValidatorConstraint({ name: 'isDni', async: false })
export class IsDni implements ValidatorConstraintInterface {
  validate(text: string) {
    return validateRut(text);
  }

  defaultMessage() {
    return 'Value ($value) is an invalid dni!';
  }
}
