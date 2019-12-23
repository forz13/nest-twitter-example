import {UserEntity} from "../user.entity";

export class ReadUserDto {
    readonly id: number;
    readonly name: string;
    readonly email: string;


    constructor(user: UserEntity) {
        this.name = user.name;
        this.email = user.email;
        this.id = user.id
    }
}
