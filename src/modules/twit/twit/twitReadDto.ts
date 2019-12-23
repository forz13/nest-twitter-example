import {TwitEntity} from "../twit.entity";

export class TwitReadDto {
    id: number;
    text: string;
    create_date: number;
    update_date: number;
    user: { id: number, name: string };
    tags: { tag_id: number, name: string }[] = [];

    constructor(twit: TwitEntity) {
        this.id = twit.id;
        this.text = twit.text;
        this.create_date = twit.create_date;
        this.update_date = twit.update_date;
        this.setTags(twit);
        this.setUser(twit);
    }

    private setUser(twit: TwitEntity) {
        if (twit.user) {
            this.user = {
                id: twit.user.id,
                name: twit.user.name,
            };
        }
    }

    private setTags(twit: TwitEntity) {
        if (twit.twitHasTag && twit.twitHasTag.length) {
            for (let twitTag of twit.twitHasTag) {
                if (twitTag.tag) {
                    this.tags.push({tag_id: twitTag.tag.id, name: twitTag.tag.name});
                }
            }
        }
    }
}
