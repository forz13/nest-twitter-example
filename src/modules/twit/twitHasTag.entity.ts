import {Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, ManyToOne, BeforeInsert,JoinTable} from 'typeorm';
import {TagEntity} from '../tag/tag.entity';
import {TwitEntity} from './twit.entity';
import {UtilsService} from '../../providers/utils.service'

@Entity('tbl_twit_has_tag')
export class TwitHasTag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int', width: 11})
    twit_id;

    @Column({type: 'int', width: 11})
    tag_id;

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
    @JoinTable()
    tag: TagEntity;

    @ManyToOne(type => TwitEntity, twit => twit.twitHasTag)
    @JoinTable()
    twit: TwitEntity;

}
