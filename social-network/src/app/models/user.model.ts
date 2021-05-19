export class User {
    uid: string;
    constructor(public email: string, public password: string, public pseudo: string, public photo: string) {}
}