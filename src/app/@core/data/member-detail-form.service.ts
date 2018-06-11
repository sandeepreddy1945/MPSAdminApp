/*tslint:disable*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Member } from '../../@model/member';
import { environment } from '../../../environments/environment';
import { ManagerDetails } from '../../@model/ManagerDetails';

const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );

const sampleManagerDetails: ManagerDetails[] = [new ManagerDetails( '1', 'Sandeep Reddy Battula' ),
new ManagerDetails( '2', 'Lakshmi' ),
new ManagerDetails( '3', 'Ramana' ),
new ManagerDetails( '4', 'Pradip' ),
new ManagerDetails( '5', 'Lakshmisha' )];

const sampleTeamNames: string[] = ['EnterpriseRx', 'PharmacyRx', 'Pharmaserv', 'EnterpriseRx Rapid'];

@Injectable( {
    providedIn: 'root',

} )
export class MemberDetailFormService {

    constructor() { }

    fecthManagerDetails(): Observable<ManagerDetails[]> {
        // TODO currently sample values are present will later be replaced
        return observableOf( sampleManagerDetails );
    }

    fetchTeamDetais(): Observable<string[]> {
        return observableOf( sampleTeamNames );
    }
}
