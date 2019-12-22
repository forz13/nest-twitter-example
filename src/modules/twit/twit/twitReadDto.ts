import {TwitEntity} from "../twit.entity";

export class TwitReadDto {
    readonly id: number;
    readonly text: string;
    readonly user: { id: number, name: string };
    readonly tags: { tag_id: number, name: string }[] = [];

    constructor(twit: TwitEntity) {
        this.id = twit.id;
        this.text = twit.text;
        this.user = {
            id: twit.user.id,
            name: twit.user.name,
        };
        if (twit.twitHasTag && twit.twitHasTag.length) {
            for (let twitTag of twit.twitHasTag) {
                this.tags.push({tag_id: twitTag.tag.id, name: twitTag.tag.name});
            }
        }
    }
}
