import {Controller, Get, Post, Body, HttpCode} from '@nestjs/common';
import {RegisterUserDto} from './dto/register-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @HttpCode(200)
    async register(@Body() userData: RegisterUserDto) {
        return await this.userService.register(userData);
    }
    @Post('auth')
    async auth(): Promise<string> {
        return 'lala';
    }
}
