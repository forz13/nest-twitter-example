import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class UserUpdateProfileDto {
    @IsOptional()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    readonly password: string;
}
