import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    Get,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';

import { AuthUser } from '../../decorators/auth-user.decorator';
import {UserService} from '../user/user.service';
import {UserEntity} from '../user/user.entity';
import {AuthService} from './auth.service';
import {LoginPayloadDto} from './dto/LoginPayloadDto';
import {UserLoginDto} from './dto/UserLoginDto';
import {UserRegisterDto} from './dto/UserRegisterDto';
import {ReadUser} from '../user/dto/read-user.dto';
import {AuthGuard} from '../../guards/auth.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';

@Controller('auth')
export class AuthController {
    constructor(
        public readonly userService: UserService,
        public readonly authService: AuthService,
    ) {
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async userLogin(
        @Body() userLoginDto: UserLoginDto,
    ): Promise<LoginPayloadDto> {
        const userEntity = await this.authService.validateUser(userLoginDto);
        const token = await this.authService.createToken(userEntity);
        return new LoginPayloadDto(UserService.buildUserRO(userEntity),token);
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    async userRegister(
        @Body() userRegisterDto: UserRegisterDto,
    ): Promise<ReadUser> {
        return await this.userService.register(userRegisterDto,);
    }

    @Get('me')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    async getCurrentUser(@AuthUser() user: UserEntity) {
        return  UserService.buildUserRO(user);
    }
}
