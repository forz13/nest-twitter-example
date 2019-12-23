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
    ValidationPipe
} from '@nestjs/common';
import {AuthGuard} from "../../guards/auth.guard";
import {AuthUserInterceptor} from "../../interceptors/auth-user-interceptor.service";
import {TwitService} from "./twit.service";
import {TwitNotFoundException} from "../../exceptions/twit-not-found.exception";
import {TwitCreateDto} from "./twit/twitCreate.dto";
import {TwitUpdateDto} from "./twit/twitUpdate.dto";
import {TwitPageOptionsDto} from "./twit/twitPageOptionsDto";
import {TwitPageDto} from "./twit/twitPageDto";

@Controller('twit')
@UseGuards(AuthGuard)
@UseInterceptors(AuthUserInterceptor)
export class TwitController {
    constructor(private readonly twitService: TwitService) {
    }

    @Get('twits')
    async getTwits(
        @Query(new ValidationPipe({transform: true})) pageOptionsDto: TwitPageOptionsDto,): Promise<TwitPageDto> {
        return this.twitService.getTwits(pageOptionsDto);
    }


    @Get(':id')
    async getTwit(@Param() params) {
        const twit = await this.twitService.findOne(params.id, ["user", "twitHasTag", "twitHasTag.tag"]);
        if (!twit) {
            throw new TwitNotFoundException();
        }
        return TwitService.buildTwitRO(twit);
    }

    @Post()
    @HttpCode(200)
    async createTwit(@Body() createDto: TwitCreateDto) {
        const twit = await this.twitService.create(createDto);
        return TwitService.buildTwitRO(twit);
    }

    @Post(':id')
    @HttpCode(200)
    async updateTwit(@Body() updateDto: TwitUpdateDto, @Param() params) {
        const twit = await this.twitService.update(params.id, updateDto);
        if (!twit) {
            throw new TwitNotFoundException();
        }
        return TwitService.buildTwitRO(twit);
    }
}
