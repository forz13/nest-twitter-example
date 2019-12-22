import {Body, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TwitEntity} from './twit.entity';
import {TwitReadDto} from './twit/twitReadDto';
import {TwitCreateDto} from './twit/twitCreate.dto';
import {AuthService} from "../auth/auth.service";
import {TwitHasTagEntity} from "./twitHasTag.entity";
import {TagEntity} from "../tag/tag.entity";
import {TagService} from "../tag/tag.service";
import {TagCreateDto} from "../tag/dto/tagCreate.dto";

@Injectable()
export class TwitService {
    constructor(@InjectRepository(TwitEntity) private readonly twitRepository: Repository<TwitEntity>,
                @InjectRepository(TwitHasTagEntity) private readonly twitHasTagRepository: Repository<TwitHasTagEntity>,
                private readonly tagService: TagService) {
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
        const newTwit: TwitEntity = new TwitEntity();
        newTwit.text = createDto.text;
        newTwit.user = AuthService.getAuthUser();
        const twit: TwitEntity = await this.twitRepository.save(newTwit);
        await this.saveTags(twit, createDto.tags);
        const options = {where: {id: twit.id}, relations: ["user", "twitHasTag", "twitHasTag.tag"]};
        return await this.twitRepository.findOne(options);
    }

    public async update(id: number, @Body() createDto: TwitCreateDto): Promise<TwitEntity> {
        const options = {where: {id}, relations: ["user", "twitHasTag", "twitHasTag.tag"]};
        let twit: TwitEntity = await this.twitRepository.findOne(options);
        twit.text = createDto.text;
        twit = await this.twitRepository.save(twit);
        if (createDto.tags) {
            await this.updateTags(twit, createDto.tags);
        }
        return await this.twitRepository.findOne(options);
    }

    private async updateTags(twit: TwitEntity, tags: string) {
        await this.deleteTagsByTwit(twit)
        await this.saveTags(twit, tags);
    }

    public async deleteTagsByTwit(twit: TwitEntity) {
        return await this.twitHasTagRepository.delete({twit});
    }

    private async saveTags(twit: TwitEntity, tags: string) {
        let tagsArray = tags.split('#');
        tagsArray = tagsArray.filter(val => val !== "");
        for (let someTag of tagsArray) {
            try {
                let tag: TagEntity;
                let existTags: TagEntity[] = await this.tagService.find({where: {name: someTag}});
                if (existTags[0]) {
                    tag = existTags[0];
                } else {
                    const tagDTO = new TagCreateDto();
                    tagDTO.name = someTag;
                    tag = await this.tagService.create(tagDTO);
                }
                const twitHasTag = new TwitHasTagEntity();
                twitHasTag.twit = twit;
                twitHasTag.tag = tag;
                await this.twitHasTagRepository.save(twitHasTag);
            } catch (err) {
            }
        }
    }
}
