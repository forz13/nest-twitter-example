import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as crypto from 'crypto';
import {TwitEntity } from '../twit/twit.entity';
import {timestamp} from '../utils/lib';

@Entity('tbl_user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 100 })
    name;

    @Column('varchar', { length: 100 })
    @IsEmail()
    email;

    @Column('varchar', { length: 50 })
    password;

    @BeforeInsert()
    hashPassword() {
        this.password = crypto.createHmac('sha256', this.password).digest('hex');
        this.create_date = timestamp();
        this.update_date = timestamp();
    }

    @Column({ type: 'int', default: () => timestamp()})
    create_date;

    @Column({ type: 'int', default: () => timestamp()})
    update_date;

    @BeforeUpdate()
    updateTimestamp() {
        this.update_date = timestamp();
    }

    @OneToMany(type => TwitEntity, twit => twit.user_id)
    twits: TwitEntity[];
}
