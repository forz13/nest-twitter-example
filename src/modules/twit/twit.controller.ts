import {Body, Controller, Get, HttpCode, Param, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import {AuthGuard} from "../../guards/auth.guard";
import {AuthUserInterceptor} from "../../interceptors/auth-user-interceptor.service";
import {TwitService} from "./twit.service";
import {TwitNotFoundException} from "../../exceptions/twit-not-found.exception";
import {TwitCreateDto} from "./twit/twitCreate.dto";

@Controller('twit')
@UseGuards(AuthGuard)
@UseInterceptors(AuthUserInterceptor)
export class TwitController {
    constructor(private readonly twitService: TwitService) {
    }

    @Get(':id')
    async getTwit(@Param() params) {
        const twit = await this.twitService.findOne(params.id, ["user", "twitHasTag","twitHasTag.tag"]);
        console.log(twit);
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
}
