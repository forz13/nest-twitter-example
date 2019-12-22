export class TagReadDto {
    readonly id: number;
    readonly name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
