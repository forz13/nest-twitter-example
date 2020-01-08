import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
    OneToMany,
    Unique,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { UtilsService } from '../../providers/utils.service';
import { TwitEntity } from '../twit/twit.entity';
import { TagSubscribersEntity } from '../tag/tagSubscribers.entity';
import { TwitLikeEntity } from '../twit/twitLike.entity';

@Entity('tbl_user')
@Unique('tbl_user', ['email'])
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 100 })
    name: string;

    @Column('varchar', { length: 100 })
    @IsEmail()
    email: string;

    @Column('varchar', { length: 200 })
    password: string;

    @Column({ type: 'int' })
    create_date: number;

    @Column({ type: 'int' })
    update_date: number;

    @BeforeInsert()
    setTimestamp() {
        this.update_date = UtilsService.timestamp();
        this.create_date = UtilsService.timestamp();
    }

    @BeforeUpdate()
    updateTimestamp() {
        this.update_date = UtilsService.timestamp();
    }

    @OneToMany(
        type => TwitEntity,
        twit => twit.user,
    )
    twits: TwitEntity[];

    @OneToMany(
        type => TagSubscribersEntity,
        tagSubscribers => tagSubscribers.user,
    )
    tagSubscribers: TagSubscribersEntity[];

    @OneToMany(
        type => TwitLikeEntity,
        twitLike => twitLike.user,
    )
    likes: TwitLikeEntity[];
}
