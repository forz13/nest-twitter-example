import { TwitReadDto } from './twitReadDto';
import { PageMetaDto } from '../../../common/dto/PageMetaDto';

export class TwitPageDto {
    readonly data: TwitReadDto[];

    readonly meta: PageMetaDto;

    constructor(data: TwitReadDto[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
