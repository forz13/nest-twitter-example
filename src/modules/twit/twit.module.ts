import {Module} from '@nestjs/common';
import {TwitController} from './twit.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TwitEntity} from "./twit.entity";
import {TwitService} from "./twit.service";
import {TwitHasTagEntity} from "./twitHasTag.entity";
import {TagService} from "../tag/tag.service";
import {TagModule} from "../tag/tag.module";

@Module({
    imports: [TypeOrmModule.forFeature([TwitEntity,TwitHasTagEntity]),TagModule],
    controllers: [TwitController],
    providers: [TwitService],
    exports: [TwitService],
})
export class TwitModule {
}
