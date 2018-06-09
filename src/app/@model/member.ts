export class Member {
    portalId: number;
    fullName: string;
    email: string;
    designation: string;
    experience: number;

    constructor( portalId: number,
        fullName: string,
        email: string,
        designation: string,
        experience: number ) {
        this.portalId = portalId;
        this.fullName = fullName;
        this.email = email;
        this.designation = designation;
        this.experience = experience;
    }
}
