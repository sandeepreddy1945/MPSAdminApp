/*tslint:disable*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { TeamDetails } from '../../@model/teamDetails';
import { environment } from '../../../environments/environment';

const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );
const fetchAllTeams: string = environment.devServerURL + '/team/list';
const addNewTeam: string = environment.devServerURL + '/team/addTeam';
const deleteTeam: string = environment.devServerURL + '/team/deleteTeam';
const deleteTeamByBoundary: string = environment.devServerURL + '/team/delete/deleteTeam';
const editTeamDetails: string = environment.devServerURL + '/team/update';

@Injectable( {
    providedIn: 'root',
} )
export class TeamDetailsService {

    constructor( private httpClient: HttpClient ) { }

    /**
     * Returns an Observable Array of Team Names.
     */
    fetchAllTeams(): Observable<TeamDetails[]> {
        return this.httpClient.get<TeamDetails[]>( fetchAllTeams, { headers: headers } );
    }

    /**
     * @todo : before adding a team name need to check if the manager is existing or not .Might cause a 
     * data inconsistency problem if not later.
     */
    addNewTeam( m: TeamDetails ): Observable<TeamDetails> {
        return this.httpClient.post<TeamDetails>( addNewTeam, JSON.stringify( m ), { headers: headers } );
    }

    /**
     * @todo : before deleting we need to confirm that there are no more employess on that team. If there are any 
     * the team should not be deleted.
     */
    deleteTeam( m: TeamDetails ): Observable<TeamDetails> {
        return this.httpClient.delete<TeamDetails>( deleteTeam, { headers: headers, params: { 'teamName': m.teamName } } );
    }

    deleteTeamByBoundary( m: TeamDetails ): Observable<TeamDetails> {
        return this.httpClient.post<TeamDetails>( deleteTeamByBoundary, JSON.stringify( m ), { headers: headers } );
    }

    editTeamDetails( m: string[] ): Observable<TeamDetails> {
        return this.httpClient.post<TeamDetails>( editTeamDetails, JSON.stringify( m ), { headers: headers } );
    }
}
