import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class TwitUpdateDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(280)
    readonly text: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    readonly tags: string;
}
