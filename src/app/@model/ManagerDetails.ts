export class ManagerDetails {
    portalId: string;
    name: string;
    teamName: string;
    /**
     * Manager Detail Constructor with team name as optional.
     * @param portalId
     * @param name
     * @param teamName
     */
    constructor( portalId: string, name: string, teamName?: string ) {
        this.portalId = portalId;
        this.name = name;
        this.teamName = teamName;
    }
}
