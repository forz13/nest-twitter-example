import {Body, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TwitEntity} from './twit.entity';

@Injectable()
export class TwitService {
    constructor(@InjectRepository(TwitEntity) private readonly twitRepository: Repository<TwitEntity>,) {
    }

    public async findOne(id: number): Promise<TwitEntity | undefined> {
        return await this.twitRepository.findOne({where: {id}});
    }

}
