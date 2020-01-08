import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class UserRegisterDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @MinLength(6)
    readonly password: string;
}
