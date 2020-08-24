import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserModule } from '../modules/user/user.module';
import { UserService } from '../modules/user/user.service';
import { TwitModule } from '../modules/twit/twit.module';
import { TwitService } from '../modules/twit/twit.service';
import * as faker from 'faker';
import { TwitEntity } from '../modules/twit/twit.entity';
import { UserEntity } from '../modules/user/user.entity';

(async () => {
    console.log('Start fill DB with fake data');
    const context = await NestFactory.createApplicationContext(AppModule);
    const userModule = await context.select<UserModule>(UserModule);
    const userService = userModule.get<UserService>(UserService);
    const twitModule = await context.select<TwitModule>(TwitModule);
    const twitService = twitModule.get<TwitService>(TwitService);
    const user = await userService.register({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: '0000',
    });
    const userEntity = new UserEntity();
    userEntity.id = user.id;
    const countTwits = Array(100);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const ignored of countTwits) {
        try {
            const twit = new TwitEntity();
            twit.text = faker.hacker.phrase();
            twit.user = userEntity;
            const savedTwit = await twitService.save(twit);
            const tags = [];
            const countTags = Array(4);
            countTags.forEach(() => {
                tags.push(faker.commerce.productName());
            });
            await twitService.saveTags(savedTwit, tags.join(';'));
        } catch (err) {
            console.log(`save error : ${err.message}`);
        }
    }
    console.log('Done');
    process.exit(0);
})();
