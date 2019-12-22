import {RegisterUserDto} from './dto/register-user.dto';
import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {getRepository, Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {HttpException} from '@nestjs/common/exceptions/http.exception';
import {HttpStatus} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import * as crypto from 'crypto';
import {ReadUser} from "./dto/read-user.dto";

@Injectable()
export class UserService {
    private readonly passwordSalt: string;

    constructor(private readonly configService: ConfigService,
                @InjectRepository(UserEntity)
                private readonly userRepository: Repository<UserEntity>,) {
        this.passwordSalt = this.configService.get<string>('APP_SECRET');
    }

    async findOne(id: number): Promise<UserEntity | undefined> {
        return await this.userRepository.findOne({where: {id}});
    }

    async register(userData: RegisterUserDto) {
        const {name, email, password} = userData;

        const duplicateEmail = await this.userRepository.find({where: {email}});
        if (duplicateEmail.length) {
            const errors = {username: 'Email must be unique.'};
            throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
        }
        const newUser = new UserEntity();
        newUser.name = name;
        newUser.email = email;
        const salt = this.passwordSalt;
        newUser.password = this.generatePassword(password, salt);
        const savedUser = await this.userRepository.save(newUser);
        return UserService.buildUserRO(savedUser);
    }


    public static buildUserRO(user: UserEntity): ReadUser {
        return new ReadUser(user.name, user.email);
    }

    private generatePassword(pass: string, salt): string {
        return crypto.createHmac('sha256', this.passwordSalt).update(pass).digest('hex');
    }

    public async authenticate(email: string, password: string): Promise<UserEntity | undefined> {
        let user: UserEntity;
        user = await this.userRepository.findOne({where: {email}});
        const passHash = crypto.createHmac('sha256', this.passwordSalt).update(password).digest('hex');
        if (user && user.password === passHash) {
            delete user.password;
            return user;
        }
    }
}
