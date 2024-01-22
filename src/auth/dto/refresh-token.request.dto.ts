import { IsString } from 'class-validator';

export class refreshTokenRequestDTO {
  @IsString()
  token: string;
}
