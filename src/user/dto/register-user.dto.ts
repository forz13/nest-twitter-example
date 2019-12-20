import { IsNotEmpty , MaxLength} from 'class-validator';

export class RegisterUserDto {

    @IsNotEmpty()
    @MaxLength(100)
    readonly name: string;

    @IsNotEmpty()
    @MaxLength(100)
    readonly email: string;

    @IsNotEmpty()
    @MaxLength(50)
    readonly password: string;
}
