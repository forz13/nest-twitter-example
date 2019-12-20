import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('twit')
export class TwitEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 280 })
    text;

    @Column({ type: 'int', default: () => Math.floor(Date.now() / 1000)})
    create_date;

    @Column({ type: 'int', default: () => Math.floor(Date.now() / 1000)})
    update_date;

    @BeforeUpdate()
    updateTimestamp() {
        this.update_date = Math.floor(Date.now() / 1000);
    }
    @BeforeInsert()
    hashPassword() {
        this.create_date = Math.floor(Date.now() / 1000);
        this.update_date = Math.floor(Date.now() / 1000);
    }

    @ManyToOne(type => UserEntity, user => user.twits)
    user_id: UserEntity;
}
