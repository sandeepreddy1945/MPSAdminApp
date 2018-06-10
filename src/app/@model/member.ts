export class Member {
    portalId: string;
    fullName: string;
    email: string;
    designation: string;
    experience: number;

    constructor( portalId: string,
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
