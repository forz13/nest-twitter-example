import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './modules/user/user.module';
import {TwitModule} from './modules/twit/twit.module';
import {TagModule} from './modules/tag/tag.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigService} from './shared/services/config.service';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from "./modules/auth/auth.module";

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
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {
}
