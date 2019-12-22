import {JwtService} from '@nestjs/jwt';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '../../shared/services/config.service';
import {UserEntity} from '../user/user.entity';
import {UserLoginDto} from '../user/dto/userLogin.dto';
import {UserNotFoundException} from '../../exceptions/user-not-found.exception';
import {UserService} from '../user/user.service';
import {ContextService} from '../../providers/context.service';
import {TokenPayloadDto} from './dto/tokenPayload.dto';

@Injectable()
export class AuthService {
    private static _authUserKey = 'user_key';

    constructor(
        public readonly jwtService: JwtService,
        public readonly configService: ConfigService,
        public readonly userService: UserService,
    ) {
    }

    async createToken(user: UserEntity): Promise<TokenPayloadDto> {
        return new TokenPayloadDto({
            expiresIn: this.configService.getNumber('JWT_EXPIRATION_TIME'),
            accessToken: await this.jwtService.signAsync({id: user.id}),
        });
    }

    async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
        const user = await this.userService.authenticate(userLoginDto.email, userLoginDto.password);
        if (!user) {
            throw new UserNotFoundException();
        }
        return user;
    }

    static setAuthUser(user: UserEntity) {
        ContextService.set(AuthService._authUserKey, user);
    }

    static getAuthUser(): UserEntity {
        return ContextService.get(AuthService._authUserKey);
    }
}
