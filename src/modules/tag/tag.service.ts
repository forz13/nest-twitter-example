import {Body, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TagEntity} from './tag.entity';
import {TagReadDto} from './dto/tagReadDto'
import {TagCreateDto} from "./dto/tagCreate.dto";

@Injectable()
export class TagService {
    constructor(@InjectRepository(TagEntity) private readonly tagRepository: Repository<TagEntity>,) {
    }

    public async findOne(id: number): Promise<TagEntity | undefined> {
        return await this.tagRepository.findOne({where: {id}});
    }

    public async create(createDto: TagCreateDto): Promise<TagEntity> {
        const newTag = new TagEntity();
        newTag.name = createDto.name;
        return await this.tagRepository.save(newTag);
    }

    public static buildTagRO(tag: TagEntity): TagReadDto {
        return new TagReadDto(tag.id, tag.name);
    }
}
