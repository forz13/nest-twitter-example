import {Module} from '@nestjs/common';
import {TwitController} from './twit.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TwitEntity} from "./twit.entity";
import {TwitService} from "./twit.service";
import {TwitHasTagEntity} from "./twitHasTag.entity";
import {TagModule} from "../tag/tag.module";
import {TwitLikeEntity} from "./twitLike.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TwitEntity,TwitHasTagEntity,TwitLikeEntity]),TagModule],
    controllers: [TwitController],
    providers: [TwitService],
    exports: [TwitService],
})
export class TwitModule {
}
