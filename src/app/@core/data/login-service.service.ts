/*tslint:disable*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ResetPasswordAndImage } from '../../@model/resetPassword';
import { environment } from '../../../environments/environment';
import { ManagerDetails } from '../../@model/ManagerDetails';

const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );

const resetPasswordEnpoint: string = environment.devServerURL + '/auth/reset-pass';
const saveProfilePic: string = environment.devServerURL + '/image/save';
const retrieveProfilePic: string = environment.devServerURL + '/image/fetch';

@Injectable( {
    providedIn: 'root',
} )
export class LoginServiceService {

    constructor( private httpClient: HttpClient ) { }

    resetPassword( m: ResetPasswordAndImage ): Observable<string> {
        //  console.log( JSON.stringify( m ) );
        return this.httpClient.post<string>( resetPasswordEnpoint, JSON.stringify( m ), { headers: headers } );
    }

    fetchProfilePic( m: ResetPasswordAndImage ): Observable<any> {
        //  console.log( JSON.stringify( m ) );
        return this.httpClient.post<any>( retrieveProfilePic, JSON.stringify( m ), { headers: headers } );
    }

    saveNewProfilePicture( m: ResetPasswordAndImage ): Observable<String> {
        //    console.log( JSON.stringify( m ) );
        return this.httpClient.post<string>( saveProfilePic, JSON.stringify( m ), { headers: headers } );
    }
}
