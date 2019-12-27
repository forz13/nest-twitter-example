import {UserRegisterDto} from './dto/userRegister.dto';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {HttpException} from '@nestjs/common/exceptions/http.exception';
import {HttpStatus} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import * as crypto from 'crypto';
import {ReadUserDto} from "./dto/userRead.dto";
import {UserUpdateProfileDto} from "./dto/userUpdateProfile.dto";

@Injectable()
export class UserService {
    private readonly passwordSalt: string;

    constructor(private readonly configService: ConfigService,
                @InjectRepository(UserEntity)
                private readonly userRepository: Repository<UserEntity>,) {
        this.passwordSalt = this.configService.get<string>('APP_SECRET');
    }

    public async findOne(id: number): Promise<UserEntity | undefined> {
        return await this.userRepository.findOne({where: {id}});
    }

    public async register(userData: UserRegisterDto): Promise<UserEntity> {
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
        return await this.userRepository.save(newUser);

    }

    public async updateProfile(userID: number, updateDTO: UserUpdateProfileDto): Promise<UserEntity> {
        const user = await this.findOne(userID);
        if (updateDTO.name) {
            user.name = updateDTO.name;
        }
        if (updateDTO.email) {
            user.email = updateDTO.email;
        }
        if (updateDTO.password) {
            const salt = this.passwordSalt;
            user.password = this.generatePassword(updateDTO.password, salt);
        }
        return await this.userRepository.save(user);

    }


    public static buildUserRO(user: UserEntity): ReadUserDto {
        return new ReadUserDto(user);
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
