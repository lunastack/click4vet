// All these DOTS are shared across different modules.
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsPositive()
  page?: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsPositive()
  limit?: number;
}
