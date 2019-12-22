import {IsNotEmpty, IsString, MaxLength} from "class-validator";

export class TwitCreateDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    readonly text: string;
}
