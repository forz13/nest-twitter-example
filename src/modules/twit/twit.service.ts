import {Body, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TwitEntity} from './twit.entity';
import {TwitReadDto} from './twit/twitReadDto';
import {TwitCreateDto} from './twit/twitCreate.dto';
import {AuthService} from "../auth/auth.service";

@Injectable()
export class TwitService {
    constructor(@InjectRepository(TwitEntity) private readonly twitRepository: Repository<TwitEntity>,) {
    }

    public async findOne(id: number, relations?: object): Promise<TwitEntity | undefined> {
        let condition = {where: {id}};
        if (relations) {
            condition = Object.assign({relations}, condition);
        }
        return await this.twitRepository.findOne(condition);
    }

    public static buildTwitRO(twit: TwitEntity): TwitReadDto {
        return new TwitReadDto(twit);
    }

    public async create(@Body() createDto: TwitCreateDto): Promise<TwitEntity> {
        const newTwit = new TwitEntity();
        newTwit.text = createDto.text;
        newTwit.user = AuthService.getAuthUser();
        return await this.twitRepository.save(newTwit);
    }


}
