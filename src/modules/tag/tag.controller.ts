import {
    Controller,
    Get,
    UseGuards,
    UseInterceptors,
    Param,
    Body,
    HttpCode,
    Post,
} from '@nestjs/common';
import {AuthGuard} from "../../guards/auth.guard";
import {AuthUserInterceptor} from "../../interceptors/auth-user-interceptor.service";
import {TagService} from "./tag.service";
import {TagCreateDto} from "./dto/tagCreate.dto";
import {TagNotFoundException} from "../../exceptions/tag-not-found.exception";


@Controller('tag')
@UseGuards(AuthGuard)
@UseInterceptors(AuthUserInterceptor)
export class TagController {
    constructor(private readonly tagService: TagService) {
    }

    @Get(':id')
    async getTag(@Param() params) {
        const tag = await this.tagService.findOne(params.id);
        if (!tag) {
            throw new TagNotFoundException();
        }
        return TagService.buildTagRO(tag);
    }

    @Post()
    @HttpCode(200)
    async createTag(@Body() createDto: TagCreateDto) {
        const tag = await this.tagService.create(createDto);
        return TagService.buildTagRO(tag);
    }

}
