'use strict';

import { TokenPayloadDto } from './TokenPayloadDto';
import { ReadUser } from '../../user/dto/read-user.dto';


export class LoginPayloadDto {
    user: ReadUser;
    token: TokenPayloadDto;

    constructor(user: ReadUser, token: TokenPayloadDto) {
        this.user = user;
        this.token = token;
    }
}
