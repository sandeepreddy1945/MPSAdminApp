/*tslint:disable*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Member } from '../../@model/member';
import { environment } from '../../../environments/environment';

const saveEndPoint: string = environment.devServerURL + '/api/member/save';
const updateEndPoint: string = environment.devServerURL + '/api/member/update';
const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );
// const options = new RequestOptions({ headers: headers });
@Injectable()
export class SmartTableService {

    constructor( private httpClient: HttpClient ) {

    }

    data = [{
        portalId: 100277,
        fullName: 'Sandeep Reddy',
        email: 'SandeepReddy@gmail.com',
        designation: 'Team Lead',
        experience: 3.2,
    }];

    getData() {
        return this.data;
    }

    saveNewEntry( m: Member ): void {
        this.httpClient.post<Member>( saveEndPoint, JSON.stringify( m ), { headers: headers } )
            .subscribe( o => { console.log( o ) } );
    }
}
