'use strict';

import { TokenPayloadDto } from './tokenPayload.dto';
import { ReadUser } from '../../user/dto/userRead.dto';


export class LoginPayloadDto {
    user: ReadUser;
    token: TokenPayloadDto;

    constructor(user: ReadUser, token: TokenPayloadDto) {
        this.user = user;
        this.token = token;
    }
}
