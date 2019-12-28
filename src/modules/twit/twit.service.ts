import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TwitEntity} from './twit.entity';
import {TwitReadDto} from './twit/twitReadDto';
import {TwitCreateDto} from './twit/twitCreate.dto';
import {TwitHasTagEntity} from "./twitHasTag.entity";
import {TagEntity} from "../tag/tag.entity";
import {TagService} from "../tag/tag.service";
import {TagCreateDto} from "../tag/dto/tagCreate.dto";
import {TwitPageOptionsDto} from "./twit/twitPageOptionsDto";
import {TwitPageDto} from "./twit/twitPageDto";
import {PageMetaDto} from "../../common/dto/PageMetaDto";
import {UtilsService} from "../../providers/utils.service";
import {TwitLikeEntity} from "./twitLike.entity";

@Injectable()
export class TwitService {
    constructor(@InjectRepository(TwitEntity) private readonly twitRepository: Repository<TwitEntity>,
                @InjectRepository(TwitHasTagEntity) private readonly twitHasTagRepository: Repository<TwitHasTagEntity>,
                @InjectRepository(TwitLikeEntity) private readonly twitLikeEntityRepository: Repository<TwitLikeEntity>,
                private readonly tagService: TagService) {
    }

    public async findOne(twitID: number, relations?: string[]): Promise<TwitEntity | undefined> {
        let condition = {where: {id: twitID}};
        if (relations) {
            condition = Object.assign({relations}, condition);
        }
        return await this.twitRepository.findOne(condition);
    }

    public extraRelations(): string[] {
        return ["user", "twitHasTag", "twitHasTag.tag", "twitHasLike"];
    }

    public async create(userID: number, createDto: TwitCreateDto): Promise<TwitEntity | undefined> {
        const newTwit: TwitEntity = new TwitEntity();
        newTwit.text = createDto.text;
        newTwit.user_id = userID;
        const twit: TwitEntity = await this.twitRepository.save(newTwit);
        if (createDto.tags) {
            await this.saveTags(twit, createDto.tags);
        }
        return twit;
    }

    public async update(userID: number, twitID: number, createDto: TwitCreateDto): Promise<TwitEntity | void> {
        const options = {where: {user_id: userID, id: twitID}};
        let twit: TwitEntity = await this.twitRepository.findOne(options);
        if (!twit) {
            return;
        }
        twit.text = createDto.text;
        twit = await this.twitRepository.save(twit);
        if (createDto.tags) {
            await this.updateTags(twit, createDto.tags);
        }
        return twit;
    }

    public async save(twitEntity: TwitEntity): Promise<TwitEntity> {
        return await this.twitRepository.save(twitEntity);
    }

    public static buildTwitRO(twit: TwitEntity): TwitReadDto {
        return new TwitReadDto(twit);
    }

    public async getTwits(pageOptionsDto: TwitPageOptionsDto): Promise<TwitPageDto> {
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
            .leftJoinAndSelect("twitHasTag.tag", "tag")
            .leftJoinAndSelect("twit.twitHasLike", "like");

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

    public async saveTags(twit: TwitEntity, tags: string): Promise<void> {
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

    public async setLike(userID: number, twit: TwitEntity): Promise<void> {
        const options = {where: {user_id: userID, id: twit.id}};
        const twitLike = await this.twitLikeEntityRepository.findOne({where: {user_id: userID, twit_id: twit.id}});
        if (twitLike) {
            await this.twitLikeEntityRepository.delete(twitLike);
            return;
        }
        const like = new TwitLikeEntity();
        like.user_id = userID;
        like.twit_id = twit.id;
        await this.twitLikeEntityRepository.save(like);
    }

    private async updateTags(twit: TwitEntity, tags: string): Promise<void> {
        await this.deleteTagsByTwit(twit);
        await this.saveTags(twit, tags);
    }

    private async deleteTagsByTwit(twit: TwitEntity): Promise<void> {
        await this.twitHasTagRepository.delete({twit});
    }


    private tagsStringToArray(tags: string): string[] {
        let tagsArray = tags.split(';');
        return tagsArray.filter(val => val !== '');
    }
}
