import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from '../user/user.entity';
import {TagEntity} from './tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  controllers: [TagController],
})
export class TagModule {}
