/*tslint:disable*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { Subscription, Observable } from 'rxjs';
import { delay, withLatestFrom, tap } from 'rxjs/operators';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { defaultImage } from './DefaultImage';
import { LoginServiceService } from '../../../@core/data/login-service.service';
import { NbAuthSimpleToken, NbAuthService } from '@nebular/auth';
import { ResetPasswordAndImage } from '../../../@model/resetPassword';
import { Router } from '@angular/router';
import 'style-loader!angular2-toaster/toaster.css';


@Component( {
    selector: 'login-profile',
    templateUrl: './login-profile.component.html',
    styleUrls: ['./login-profile.component.scss'],

} )
export class LoginProfileComponent implements OnInit {

    // form req
    showPassword: boolean = false;
    showConfrmPassword: boolean = false;

    // fields
    mpasword: string;
    mconfrmpassword: string;

    selectedImageData: string;

    loginToken: string;

    protected searchClick$: Subscription;

    constructor(
        private toasterService: ToasterService, private loginService: LoginServiceService,
        private nbAuthService: NbAuthService, private router: Router ) {
    }

    ngOnInit() {
        this.selectedImageData = defaultImage.defaultImageData;
        // assign the login token
        this.nbAuthService.getToken().subscribe( o => { this.loginToken = o.getValue() } );
    }

    ngOnDestroy() {
        console.log( 'On Destroy Called' );
    }

    /*********************************
     * Toaster Configuration starts here
     * ********************************/

    config: ToasterConfig;

    toasterPosition = 'toast-top-right';
    animationType = 'fade';
    timeout = 5000;
    toastsLimit = 5;

    isNewestOnTop = true;
    isHideOnClick = true;
    isDuplicatesPrevented = false;
    isCloseButton = true;

    private showToast( type: string, title: string, body: string ) {
        this.config = new ToasterConfig( {
            positionClass: this.toasterPosition,
            timeout: this.timeout,
            newestOnTop: this.isNewestOnTop,
            tapToDismiss: this.isHideOnClick,
            preventDuplicates: this.isDuplicatesPrevented,
            animation: this.animationType,
            limit: this.toastsLimit,
        } );
        const toast: Toast = {
            type: type,
            title: title,
            body: body,
            timeout: this.timeout,
            showCloseButton: this.isCloseButton,
            bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync( toast );
    }

    /*********************************
     * Toaster Configuration Ends here
     * ********************************/


    // https://www.learnhowtoprogram.com/javascript/angular-extended/dynamic-routing-navigation page for dynamic routing
    /*
     * Handles Image File Events.
     */
    handleFileEvent( event ) {
        if ( event.target.files && event.target.files[0] ) {
            var reader = new FileReader();
            reader.onload = e => {
                // this is already a base64 result so no need to atob/btoa it.
                var imgData: string = reader.result;
                //console.log( imgData );
                this.selectedImageData = imgData;
                // save the selected image
                this.saveProfilePicture( imgData );
            };
            reader.readAsDataURL( event.target.files[0] );

        }
    }

    /**
     * Resets the password using the Id and updates the DB.
     * @param event
     */
    resetPassword( event ): void {
        if ( this.mpasword && this.mconfrmpassword ) {

            if ( this.mpasword === this.mconfrmpassword ) {
                if ( this.mpasword.length < 6 ) {
                    this.showToast( 'warning', 'Password Length', 'Cannot be less than 6 digits' );
                } else {
                    var resetPass: ResetPasswordAndImage = new ResetPasswordAndImage( this.loginToken, this.mpasword );
                    this.loginService.resetPassword( resetPass ).pipe(
                        delay( 4000 ), ).subscribe( o => {
                            this.showToast( 'success', 'Password Reset !!', 'Successful' )
                        },
                        err => {
                            this.onErrorToaster( err.message )
                        },
                        () => { this.router.navigate( ['/auth/login'] ) }// navigate on success call only

                        );
                }
            } else {
                this.showToast( 'error', 'Password Doesnot Match!!!', 'Re-Enter Passwords' );
            }
        }
    }

    fetchProfilePic(): void {
        var fetchProfilePic: ResetPasswordAndImage = new ResetPasswordAndImage( this.loginToken );
        this.loginService.fetchProfilePic( fetchProfilePic ).subscribe( o => { console.log( o ) } );
    }

    saveProfilePicture( imgData: string ): void {
        var resetImg: ResetPasswordAndImage = new ResetPasswordAndImage( this.loginToken, '', imgData );
        this.loginService.saveNewProfilePicture( resetImg ).subscribe( o => { console.log( o ) } );
    }

    onErrorToaster( s: string ): void {
        this.showToast( 'error', 'Error Occured', s );
    }

}
