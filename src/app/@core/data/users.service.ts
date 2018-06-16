/*tslint:disable*/
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { switchMap, map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MemberDetailFormService } from './member-detail-form.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginServiceService } from './login-service.service';
import { CurrentUser } from '../../@model/currentUser';
import { ResetPasswordAndImage } from '../../@model/resetPassword';
import { NbAuthSimpleToken, NbAuthService } from '@nebular/auth';
import { defaultImage } from '../../pages/editors/login-profile/DefaultImage';


let counter = 0;

@Injectable()
export class UserService {

    private users = {
        nick: { name: 'Sandeep Reddy Battula Home ', picture: 'assets/images/nick.png' },
        eva: { name: 'Eva Moor', picture: 'assets/images/eva.png' },
        jack: { name: 'Jack Williams', picture: 'assets/images/jack.png' },
        lee: { name: 'Lee Wong', picture: 'assets/images/lee.png' },
        alan: { name: 'Alan Thompson', picture: 'assets/images/alan.png' },
        kate: { name: 'Kate Martinez', picture: 'assets/images/kate.png' },
    };

    private userArray: any[];

    constructor( private loginService: LoginServiceService, private nbAuthService: NbAuthService ) {
        // this.userArray = Object.values(this.users);
    }

    fetchCurrentUserData(): Observable<CurrentUser> {
        let loginToken: string;
        this.nbAuthService.getToken().subscribe( o => { loginToken = o.getValue() } );
        let userVal: CurrentUser = new CurrentUser();
        this.loginService.fetchProfilePic( new ResetPasswordAndImage( loginToken ) ).subscribe( o => {
            userVal.name = o.name;
            o.imageData != null && o.imageData != undefined && o.imageData.length > 0 ?
                userVal.picture = o.imageData : userVal.picture = defaultImage.defaultImageData;
        },
            err => { userVal.picture = defaultImage.defaultImageData; userVal.name = err.error.name } );
        return observableOf( userVal );
    }

    getUsers(): Observable<any> {
        return observableOf( this.users );
    }

    getUserArray(): Observable<any[]> {
        return observableOf( this.userArray );
    }

    getUser(): Observable<any> {
        counter = ( counter + 1 ) % this.userArray.length;
        return observableOf( this.userArray[counter] );
    }
}
