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
import {TwitPageOptionsDto} from "./twit/twitPageOptionsDto";
import {TwitPageDto} from "./twit/twitPageDto";
import {PageMetaDto} from "../../common/dto/PageMetaDto";
import {UtilsService} from "../../providers/utils.service";

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

    public async save(twitEntity: TwitEntity) {
        return await this.twitRepository.save(twitEntity);
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

    async getTwits(pageOptionsDto: TwitPageOptionsDto): Promise<TwitPageDto> {
        const queryBuilder = this.twitRepository.createQueryBuilder('twit');
        if (pageOptionsDto.q) {
            queryBuilder.where("twit.text like :text", {text: '%' + pageOptionsDto.q + '%'})
        }

        if (pageOptionsDto.create_date_start) {
            const createStartTimestamp = UtilsService.dateStringToUnixTimestamp(pageOptionsDto.create_date_start);
            queryBuilder.andWhere('twit.create_date >= :createStartTimestamp', {createStartTimestamp})
        }

        if (pageOptionsDto.create_date_end) {
            const createEndTimestamp = UtilsService.dateStringToUnixTimestamp(pageOptionsDto.create_date_end);
            queryBuilder.andWhere('twit.create_date <= :createEndTimestamp', {createEndTimestamp})
        }

        queryBuilder
            .leftJoinAndSelect("twit.user", "user")
            .leftJoinAndSelect("twit.twitHasTag", "twitHasTag")
            .leftJoinAndSelect("twitHasTag.tag", "tag");

        if (pageOptionsDto.tags) {
            const tagsArray = this.tagsStringToArray(pageOptionsDto.tags);
            queryBuilder.andWhere('tag.name IN (:tagsArray)', {tagsArray})
        }

        if (pageOptionsDto.order) {
            queryBuilder.orderBy('twit.create_date', pageOptionsDto.order)
        }


        const builder = queryBuilder
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getManyAndCount();


        const [twits, twitsCount] = await builder;

        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: twitsCount,
        });

        const twitsRead = [];
        twits.map(twit => {
            twitsRead.push(TwitService.buildTwitRO(twit));
        });
        return new TwitPageDto(twitsRead, pageMetaDto);
    }

    private async updateTags(twit: TwitEntity, tags: string) {
        await this.deleteTagsByTwit(twit);
        await this.saveTags(twit, tags);
    }

    private async deleteTagsByTwit(twit: TwitEntity) {
        return await this.twitHasTagRepository.delete({twit});
    }

    public async saveTags(twit: TwitEntity, tags: string) {
        const tagsArray = this.tagsStringToArray(tags);
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

    private tagsStringToArray(tags: string) {
        let tagsArray = tags.split(';');
        return tagsArray.filter(val => val !== '');
    }
}
