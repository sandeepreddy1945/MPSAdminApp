/*tslint:disable*/
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators/tap';


@Injectable( {
    providedIn: 'root',
} )
export class AuthGuardService implements CanActivate {

    constructor( private authService: NbAuthService, private router: Router ) {
    }

    canActivate() {
        return this.authService.isAuthenticated()
            .pipe(
            tap( authenticated => {
                if ( !authenticated ) {
                    console.log('Is Member Authenticated:' + authenticated);
                    this.router.navigate( ['auth/login'] );
                }
            } ),
        );
    }
}
