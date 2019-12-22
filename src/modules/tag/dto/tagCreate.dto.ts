import {IsNotEmpty, IsString, MaxLength} from "class-validator";

export class TagCreateDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    readonly name: string;
}
