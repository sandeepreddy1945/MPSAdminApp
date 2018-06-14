export class ResetPasswordAndImage {
    token: string;
    password: string;
    imageData: string;

    constructor( token: string, password?: string, imageData?: string ) {
        this.token = token;
        this.password = password;
        this.imageData = imageData;
    }
}
