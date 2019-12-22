import {BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {TagEntity} from './tag.entity';
import {UserEntity} from '../user/user.entity';
import {UtilsService} from '../../providers/utils.service';

@Entity('tbl_tag_subscribers')
export class TagSubscribers {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int', width: 11})
    user_id;

    @Column({type: 'int', width: 11})
    tag_id;

    @Column({type: 'int', default: () => UtilsService.timestamp()})
    create_date: number;

    @Column({type: 'int', default: () => UtilsService.timestamp()})
    update_date: number;

    @BeforeUpdate()
    updateTimestamp() {
        this.update_date = UtilsService.timestamp();
    }

    @ManyToOne(type => TagEntity, tag => tag.tagSubscribers)
    tag: TagEntity;

    @ManyToOne(type => UserEntity, user => user.tagSubscribers)
    user: UserEntity;

}
