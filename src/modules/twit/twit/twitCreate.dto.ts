import {IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";

export class TwitCreateDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(280)
    text: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    tags: string;
}
