import {Module} from '@nestjs/common';
import {TwitController} from './twit.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TwitEntity} from "./twit.entity";
import {TwitService} from "./twit.service";

@Module({
    imports: [TypeOrmModule.forFeature([TwitEntity])],
    controllers: [TwitController],
    providers: [TwitService],
    exports: [TwitService],
})
export class TwitModule {
}
