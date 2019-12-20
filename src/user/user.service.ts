import {RegisterUserDto} from './dto/register-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    }

    async register(userData: RegisterUserDto) {
        const {name, email, password} = userData;
        const duplicateEmail = await this.userRepository.find({where: {email}});
        if (duplicateEmail) {
            const errors = {username: 'Email must be unique.'};
            throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
        }
        const newUser = new UserEntity();
        newUser.name = name;
        newUser.email = email;
        newUser.password = password;
        const savedUser = await this.userRepository.save(newUser);
        return this.buildUserRO(savedUser);
    }

    private buildUserRO(user: UserEntity) {
        return {
            username: user.name,
            email: user.email,
        };
    }
}
