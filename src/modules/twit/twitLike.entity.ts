import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, ManyToOne, BeforeInsert } from 'typeorm';
import { TwitEntity } from './twit.entity';
import { UtilsService } from '../../providers/utils.service';
import { UserEntity } from '../user/user.entity';

@Entity('tbl_twit_like')
export class TwitLikeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    public user_id: number;

    @Column({ type: 'int' })
    twit_id: number;

    @Column({ type: 'int' })
    create_date;

    @Column({ type: 'int' })
    update_date;

    @BeforeUpdate()
    updateTimestamp() {
        this.update_date = UtilsService.timestamp();
    }

    @BeforeInsert()
    setTimestamp() {
        this.update_date = UtilsService.timestamp();
        this.create_date = UtilsService.timestamp();
    }

    @ManyToOne(type => TwitEntity, twit => twit.twitHasLike)
    twit: TwitEntity;

    @ManyToOne(type => UserEntity, user => user.likes)
    user: UserEntity;
}
