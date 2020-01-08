import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './tag.entity';
import { TagReadDto } from './dto/tagReadDto';
import { TagCreateDto } from './dto/tagCreate.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>,
    ) {}

    public async find(condition): Promise<TagEntity[] | undefined> {
        return this.tagRepository.find(condition);
    }

    public async findOne(id: number): Promise<TagEntity | undefined> {
        return this.tagRepository.findOne({ where: { id } });
    }

    public async create(createDto: TagCreateDto): Promise<TagEntity> {
        const tag = await this.tagRepository.findOne({
            where: { name: createDto.name },
        });
        if (tag) {
            const errors = { username: 'Tag name must be unique.' };
            throw new HttpException(
                { message: 'Input data validation failed', errors },
                HttpStatus.BAD_REQUEST,
            );
        }
        const newTag = new TagEntity();
        newTag.name = createDto.name;
        return this.tagRepository.save(newTag);
    }

    public static buildTagRO(tag: TagEntity): TagReadDto {
        return new TagReadDto(tag.id, tag.name);
    }
}
