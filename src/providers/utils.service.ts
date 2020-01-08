export class UtilsService {
    public static timestamp() {
        return Math.floor(Date.now() / 1000);
    }

    public static dateStringToUnixTimestamp(dateString: string) {
        const createDate = new Date(dateString);
        return createDate.getTime() / 1000;
    }
}
