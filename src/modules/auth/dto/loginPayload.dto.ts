import { TokenPayloadDto } from './tokenPayload.dto';
import { ReadUserDto } from '../../user/dto/userRead.dto';

export class LoginPayloadDto {
    user: ReadUserDto;
    token: TokenPayloadDto;

    constructor(user: ReadUserDto, token: TokenPayloadDto) {
        this.user = user;
        this.token = token;
    }
}
