export class MemberDetails {

    fullName: string;
    emailId: string;
    portalId: string;
    employeeId: string;
    experience: string;
    gender: string;
    designation: string;
    isManager: boolean;
    comments: string;
    hobbies: string;
    month1score: number;
    month2score: number;
    month3score: number;
    valueAddScore: number;
    onQualityScore: number;
    onTimeScore: number;
    projectDetails: string;
    teamName: string;
    managerDetails: string;
    rating: number;
    imageData: string;

    constructor( fullName: string,
        emailId: string,
        portalId: string,
        employeeId: string,
        experience: string,
        gender: string,
        designation: string,
        isManager: boolean,
        comments: string,
        hobbies: string,
        month1score: number,
        month2score: number,
        month3score: number,
        valueAddScore: number,
        onQualityScore: number,
        onTimeScore: number,
        projectDetails: string,
        teamName: string,
        managerDetails: string,
        rating?: number,
        imageData?: string ) {
        this.fullName = fullName,
            this.emailId = emailId,
            this.portalId = portalId,
            this.employeeId = employeeId,
            this.experience = experience,
            this.gender = gender,
            this.designation = designation,
            this.isManager = isManager,
            this.comments = comments,
            this.hobbies = hobbies,
            this.month1score = month1score,
            this.month2score = month2score,
            this.month3score = month3score,
            this.valueAddScore = valueAddScore,
            this.onQualityScore = onQualityScore,
            this.onTimeScore = onTimeScore,
            this.projectDetails = projectDetails,
            this.teamName = teamName,
            this.managerDetails = managerDetails,
            this.rating = rating,
            this.imageData = imageData
    }
}
