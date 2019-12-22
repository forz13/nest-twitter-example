import {Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, ManyToOne} from 'typeorm';
import {TagEntity} from '../tag/tag.entity';
import {TwitEntity} from './twit.entity';
import {UtilsService} from '../../providers/utils.service'

@Entity('tbl_twit_has_tags')
export class TwitHasTags {

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

    @ManyToOne(type => TagEntity, tag => tag.twitHasTags)
    tag: TagEntity;

    @ManyToOne(type => TwitEntity, twit => twit.twitHasTags)
    twit: TwitEntity;

}
