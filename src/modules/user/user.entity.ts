import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, CreateDateColumn} from 'typeorm';
import {IsEmail} from 'class-validator';
import {UtilsService} from '../../providers/utils.service'
import {TwitEntity} from '../twit/twit.entity';
import {TagSubscribers} from '../tag/tagSubscribers.entity';

@Entity('tbl_user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 100})
    name: string;

    @Column('varchar', {length: 100})
    @IsEmail()
    email: string;

    @Column('varchar', {length: 50})
    password: string;

    @Column({type: 'int'})
    create_date: number;

    @Column({type: 'int'})
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

    @OneToMany(type => TwitEntity, twit => twit.user_id)
    twits: TwitEntity[];

    @OneToMany(type => TagSubscribers, tagSubscribers => tagSubscribers.user)
    tagSubscribers: TagSubscribers[];
}
