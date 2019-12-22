import {TwitEntity} from "../twit.entity";

export class TwitReadDto {
    readonly id: number;
    readonly text: string;
    readonly user: {id:number,name:string};
    readonly tags: [];

    constructor(twit: TwitEntity) {
        this.id = twit.id;
        this.text = twit.text;
        this.user = {
            id: twit.user.id,
            name: twit.user.name,
        };
      //  if (twit.twitHasTag.length) {
            for (let tag in twit.twitHasTag) {
                console.log(tag);
            }
     //   }
    }
}
