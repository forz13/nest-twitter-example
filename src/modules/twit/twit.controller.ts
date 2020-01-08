import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    Post,
    UseGuards,
    UseInterceptors,
    Query,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { TwitService } from './twit.service';
import { TwitNotFoundException } from '../../exceptions/twit-not-found.exception';
import { TwitCreateDto } from './twit/twitCreate.dto';
import { TwitUpdateDto } from './twit/twitUpdate.dto';
import { TwitPageOptionsDto } from './twit/twitPageOptionsDto';
import { TwitPageDto } from './twit/twitPageDto';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserEntity } from '../user/user.entity';
import { TwitReadDto } from './twit/twitReadDto';

@Controller('twit')
@UseGuards(AuthGuard)
@UseInterceptors(AuthUserInterceptor)
export class TwitController {
    constructor(private readonly twitService: TwitService) {}

    @Get('twits')
    async getTwits(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: TwitPageOptionsDto,
    ): Promise<TwitPageDto> {
        return this.twitService.getTwits(pageOptionsDto);
    }

    @Get(':id')
    async getTwit(@Param() params): Promise<TwitReadDto> {
        const twit = await this.twitService.findOne(
            params.id,
            this.twitService.extraRelations(),
        );
        if (!twit) {
            throw new TwitNotFoundException();
        }
        return TwitService.buildTwitRO(twit);
    }

    @Post()
    @HttpCode(200)
    async createTwit(
        @AuthUser() user: UserEntity,
        @Body() createDto: TwitCreateDto,
    ): Promise<TwitReadDto> {
        const twit = await this.twitService.create(user.id, createDto);
        const twitExtra = await this.twitService.findOne(
            twit.id,
            this.twitService.extraRelations(),
        );
        return TwitService.buildTwitRO(twitExtra);
    }

    @Post(':id')
    @HttpCode(200)
    async updateTwit(
        @AuthUser() user: UserEntity,
        @Body() updateDto: TwitUpdateDto,
        @Param() params,
    ): Promise<TwitReadDto> {
        const twit = await this.twitService.update(
            user.id,
            params.id,
            updateDto,
        );
        if (!twit) {
            throw new TwitNotFoundException();
        }
        const twitExtra = await this.twitService.findOne(
            twit.id,
            this.twitService.extraRelations(),
        );
        return TwitService.buildTwitRO(twitExtra);
    }

    @Post(':id/like')
    @HttpCode(200)
    async setLike(
        @AuthUser() user: UserEntity,
        @Param() params,
    ): Promise<TwitReadDto> {
        const twitWithLike = await this.twitService.findOne(params.id);
        if (!twitWithLike) {
            throw new TwitNotFoundException();
        }
        await this.twitService.setLike(user.id, twitWithLike);
        const twitExtra = await this.twitService.findOne(
            params.id,
            this.twitService.extraRelations(),
        );
        return TwitService.buildTwitRO(twitExtra);
    }
}
