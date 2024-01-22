import { PaginationDto } from "@core/dtos/shared";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ListPetsDto extends PaginationDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    queryString?: string;
}

export class SearchPetsDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    email?: string;
}
