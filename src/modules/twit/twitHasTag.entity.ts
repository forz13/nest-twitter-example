import {Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, ManyToOne, BeforeInsert,JoinTable} from 'typeorm';
import {TagEntity} from '../tag/tag.entity';
import {TwitEntity} from './twit.entity';
import {UtilsService} from '../../providers/utils.service'

@Entity('tbl_twit_has_tag')
export class TwitHasTagEntity {
    @PrimaryGeneratedColumn()
    id: number;

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

    @ManyToOne(type => TagEntity, tag => tag.twitHasTag)
    tag: TagEntity;

    @ManyToOne(type => TwitEntity, twit => twit.twitHasTag)
    twit: TwitEntity;

}
