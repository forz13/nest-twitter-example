import {BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {UtilsService} from '../../providers/utils.service';
import {TwitHasTagEntity} from '../twit/twitHasTag.entity';
import {TagSubscribers} from './tagSubscribers.entity';

@Entity('tbl_tag')
export class TagEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 20})
    name: string;

    @Column({type: 'int'})
    create_date: number;

    @Column({type: 'int'})
    update_date: number;

    @BeforeUpdate()
    updateTimestamp() {
        this.update_date = UtilsService.timestamp();
    }

    @BeforeInsert()
    setTimestamp() {
        this.update_date = UtilsService.timestamp();
        this.create_date = UtilsService.timestamp();
    }

    @OneToMany(type => TwitHasTagEntity, twitHasTag => twitHasTag.tag)
    twitHasTag: TwitHasTagEntity[];

    @OneToMany(type => TagSubscribers, tagSubscribers => tagSubscribers.tag)
    tagSubscribers: TagSubscribers[];
}
