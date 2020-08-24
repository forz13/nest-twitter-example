import { Controller, Get, Post, Body, HttpCode, UseGuards, UseInterceptors, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserUpdateProfileDto } from './dto/userUpdateProfile.dto';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';

@Controller('user')
@UseGuards(AuthGuard)
@UseInterceptors(AuthUserInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    async getUserProfile(@Param() params) {
        const user = await this.userService.findOne(params.id);
        if (!user) {
            throw new UserNotFoundException();
        }
        return UserService.buildUserRO(user);
    }

    @Post()
    @HttpCode(200)
    async updateProfile(@AuthUser() user: UserEntity, @Body() updateDTO: UserUpdateProfileDto) {
        const savedUser = await this.userService.updateProfile(user.id, updateDTO);
        return UserService.buildUserRO(savedUser);
    }
}
