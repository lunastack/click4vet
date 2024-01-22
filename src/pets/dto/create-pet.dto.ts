import { ValidationMessage } from "@core/constants/validation-message.constants";
import { IsNotEmpty, IsString, Length } from "class-validator";

const { REQUIRED_FIELD } = ValidationMessage;

export class CreatePetDto {
    @IsNotEmpty({
        message: REQUIRED_FIELD,
    })
    @IsString()
    @Length(4, 50)
    name: string;
}
