import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeUpdate, ManyToOne, BeforeInsert} from 'typeorm';
import {UserEntity} from '../user/user.entity';
import {TwitHasTagEntity} from './twitHasTag.entity';
import {UtilsService} from '../../providers/utils.service'


@Entity('tbl_twit')
export class TwitEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 280})
    text;

    @Column({type: 'int', default: () => UtilsService.timestamp()})
    create_date;

    @Column({type: 'int', default: () => UtilsService.timestamp()})
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

    @ManyToOne(type => UserEntity, user => user.twits)
    user: UserEntity;

    @OneToMany(type => TwitHasTagEntity, twitHasTags => twitHasTags.twit)
    twitHasTag: TwitHasTagEntity[];

}
