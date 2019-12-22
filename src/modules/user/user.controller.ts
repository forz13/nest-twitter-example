import {Controller, Get, Post, Body, HttpCode, UseGuards, UseInterceptors} from '@nestjs/common';
import {UserService} from './user.service';
import {UserEntity} from './user.entity';
import {AuthGuard} from '../../guards/auth.guard';
import {AuthUserInterceptor} from '../../interceptors/auth-user-interceptor.service';
import {AuthUser} from '../../decorators/auth-user.decorator';
import {UserUpdateProfileDto} from './dto/userUpdateProfile.dto';

@Controller('user')
@UseGuards(AuthGuard)
@UseInterceptors(AuthUserInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get('profile')
    getProfile(@AuthUser() user: UserEntity) {
        return UserService.buildUserRO(user);
    }

    @Post()
    @HttpCode(200)
    async updateProfile(@AuthUser() user: UserEntity, @Body() updateDTO: UserUpdateProfileDto) {
        return await this.userService.updateProfile(user.id, updateDTO);
    }
}
