import { Module } from '@nestjs/common';
import { TwitController } from './twit.controller';

@Module({
  controllers: [TwitController]
})
export class TwitModule {}
