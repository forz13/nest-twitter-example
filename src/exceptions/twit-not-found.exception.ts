import { NotFoundException } from '@nestjs/common';

export class TwitNotFoundException extends NotFoundException {
    constructor(error?: string) {
        super('error.twit_not_found', error);
    }
}
