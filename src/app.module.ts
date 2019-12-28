import {Module, MiddlewareConsumer, NestModule} from '@nestjs/common';
import {UserModule} from './modules/user/user.module';
import {TwitModule} from './modules/twit/twit.module';
import {TagModule} from './modules/tag/tag.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigService} from './shared/services/config.service';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from "./modules/auth/auth.module";
import {contextMiddleware} from './middlewares';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) =>
                configService.typeOrmConfig,
            inject: [ConfigService],
        }),
        UserModule,
        TwitModule,
        TagModule,
        AuthModule,
    ],
    exports: [UserModule, TagModule, TwitModule]
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*');
    }
}
