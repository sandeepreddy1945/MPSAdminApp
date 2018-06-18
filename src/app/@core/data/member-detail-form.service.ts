/*tslint:disable*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { MemberDetails } from '../../@model/memberDetails';
import { environment } from '../../../environments/environment';
import { ManagerDetails } from '../../@model/ManagerDetails';
import { TeamDetails } from '../../@model/teamDetails';
import { ManagerDetailService } from './manager-detail.service';
import { TeamDetailsService } from './team-details.service';


const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );

const sampleManagerDetails: ManagerDetails[] = [new ManagerDetails( '1', 'Sandeep Reddy Battula' ),
new ManagerDetails( '2', 'Lakshmi' ),
new ManagerDetails( '3', 'Ramana' ),
new ManagerDetails( '4', 'Pradip' ),
new ManagerDetails( '5', 'Lakshmisha' )];

const sampleTeamNames: string[] = ['EnterpriseRx', 'PharmacyRx', 'Pharmaserv', 'EnterpriseRx Rapid'];

const genderAttrs: string[] = ['GENDER', 'MALE', 'FEMALE', 'OTHERS'];

const checkManagerAttrs: string[] = ['IS MEMBER MANAGER', 'YES', 'NO', 'NOT SURE'];

const saveMemberDetailsEndPoint: string = environment.devServerURL + '/api/memberdetail/save';
const fetchMemberByPortalEndPoint: string = environment.devServerURL + '/api/memberdetail/fetch';


@Injectable( {
    providedIn: 'root',

} )
export class MemberDetailFormService {

    constructor( private managerService: ManagerDetailService, private teamService: TeamDetailsService,
        private httpClient: HttpClient ) { }

    fecthManagerDetails(): Observable<ManagerDetails[]> {
        // TODO currently sample values are present will later be replaced
        return this.managerService.fetchAllManagers();
    }

    fetchTeamDetais(): Observable<TeamDetails[]> {
        return this.teamService.fetchAllTeams();
    }

    fetchGenderList(): Observable<string[]> {
        return observableOf( genderAttrs );
    }

    fetchCheckManagerList(): Observable<string[]> {
        return observableOf( checkManagerAttrs );
    }

    /**
     * Retrieves the Member Information using portal Id;
     * @param m
     */
    fetchMemberByPortalId( m: string ): Observable<MemberDetails> {
        return this.httpClient.get<MemberDetails>( fetchMemberByPortalEndPoint, { headers: headers, params: { 'portalId': m } } );
    }

    /**
     * Saves the Member Details Specified. The Same can be used for update as well in case required.
     * @param m
     */
    saveMemberDetails( m: MemberDetails ): Observable<MemberDetails> {
        return this.httpClient.post<MemberDetails>( saveMemberDetailsEndPoint, JSON.stringify( m ), { headers: headers } );
    }

}
