import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UtilsService } from '../../providers/utils.service';
import { TwitHasTagEntity } from '../twit/twitHasTag.entity';
import { TagSubscribersEntity } from './tagSubscribers.entity';

@Entity('tbl_tag')
@Unique('tbl_tag', ['name'])
export class TagEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 20 })
    name: string;

    @Column({ type: 'int' })
    create_date: number;

    @Column({ type: 'int' })
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

    @OneToMany(() => TwitHasTagEntity, twitHasTag => twitHasTag.tag)
    twitHasTag: TwitHasTagEntity[];

    @OneToMany(() => TagSubscribersEntity, tagSubscribers => tagSubscribers.tag)
    tagSubscribers: TagSubscribersEntity[];
}
