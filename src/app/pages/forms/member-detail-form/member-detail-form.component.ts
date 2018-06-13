/*tslint:disable*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { MemberDetailFormService } from '../../../@core/data/member-detail-form.service';
import { ManagerDetails } from '../../../@model/ManagerDetails';
import { MemberDetails } from '../../../@model/memberDetails';
import { NbSearchService } from '@nebular/theme';
import { Subscription, Observable } from 'rxjs';
import { delay, withLatestFrom, tap } from 'rxjs/operators';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

@Component( {
    selector: 'member-detail-form',
    templateUrl: './member-detail-form.component.html',
    styleUrls: ['./member-detail-form.component.scss'],

} )
export class MemberDetailFormComponent implements OnInit, OnDestroy {

    // variables used
    starRate = 2;
    managerDetails: ManagerDetails[];
    teamList: string[];
    position: ManagerDetails;
    genderList: string[];
    managerCheckList: string[];
    managerComboPick: string;
    genderComboPick: string;
    imageFileData: string;

    // all variables initialization
    mfullName: string;
    mrating: number = 2;
    memailId: string;
    mportalId: string;
    memployeeId: string;
    mexperience: number;
    mgender: string;
    mdesignation: string;
    misManager: string;
    mcomments: string;
    mhobbies: string;
    mmonth1score: number;
    mmonth2score: number;
    mmonth3score: number;
    mvalueAddScore: number;
    monQualityScore: number;
    monTimeScore: number;
    mprojectDetails: string;
    mteamName: string;
    mimageFile: string;

    protected searchClick$: Subscription;

    constructor( private memberService: MemberDetailFormService, private searchService: NbSearchService,
        private toasterService: ToasterService ) {
        this.searchClick$ = this.searchService.onSearchDeactivate().subscribe( o => { } );
        this.searchService.onSearchDeactivate().pipe( withLatestFrom( this.searchService.onSearchSubmit(),
            this.searchService.onSearchActivate() ) )
            .subscribe(( [item, searchObservable, searchActivateObs]: [any, any, any] ) => { this.handleSearchSelection( item, searchObservable, searchActivateObs ) } );
    }

    ngOnInit() {
        // this.mfullName = 'Sandeep Reddy';
        this.getManagerDetailsList();
        this.getTeamDetaisList();
        this.getGenderList();
        this.getManagerCheckList();
        // assign the managers drop down with the first value applicable.
        this.position = this.managerDetails[0] || new ManagerDetails( '0', 'No Managers To Select' );

    }

    ngOnDestroy() {
        console.log( 'On Destroy Called' );
    }
    // https://www.learnhowtoprogram.com/javascript/angular-extended/dynamic-routing-navigation page for dynamic routing
    handleFileEvent( event ) {
        if ( event.target.files && event.target.files[0] ) {
            var reader = new FileReader();
            reader.onload = e => {
                // this is already a base64 result so no need to atob/btoa it.
                var imgData: string = reader.result;
                //console.log( imgData );
                this.imageFileData = imgData;
            };
            reader.readAsDataURL( event.target.files[0] );

        }
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

    /**
     * Fetches the Manager Details List Available.
     */
    getManagerDetailsList(): void {
        this.memberService.fecthManagerDetails().subscribe( o => { this.managerDetails = o, console.log( o ) } );
    }

    /**
     * Fetches the Team Details List / List of Team Names.
     */
    getTeamDetaisList(): void {
        this.memberService.fetchTeamDetais().subscribe( o => { this.teamList = o, console.log( o ) } );
    }

    /**
     * Fetches the Selected Manager and assigns it to the current drop down position..
     * @param m
     */
    setSelectedManager( m: ManagerDetails ): void {
        this.position = m;
        console.log( this.position );
    }

    /**
     * Fetches the Gender List appended with  gender as attribute it self
     */
    getGenderList(): void {
        this.memberService.fetchGenderList().subscribe( o => { this.genderList = o } );
    }

    /**
     * Fetches the manager check list options.
     */
    getManagerCheckList(): void {
        this.memberService.fetchCheckManagerList().subscribe( o => { this.managerCheckList = o } );
    }

    setSelectdGender( m: string ): void {
        this.genderComboPick = m;
        this.mgender = m;
        if ( m === 'GENDER' ) {
            this.showToast( 'warning', 'Gender Option', 'Not Valid Input Selected!!' );
        }
        console.log( this.genderComboPick );
    }

    setSelectedManagerPick( m: string ): void {
        this.managerComboPick = m;
        this.misManager = m;
        if ( m === 'IS MEMBER MANAGER' ) {
            this.showToast( 'warning', 'Manager Option', 'Not Valid Input Selected!!' );
        }
        console.log( this.managerComboPick );
    }

    handleSearchSelection( item, o, b ): void {
        // cache these details so these need not be called as always .
        // this always displays the details so way is that we cache details and then make sure while exiting and reloading the 
        // cache is properly removed and also later try OnDestroy method to clear the cache once the app is exited.
        // hint : use o for fetching the portalId and other stuff.
        // only one search bar here so don't worry for the searchType present.
        // then a service method here to auto populate the details after search is made.
        // if possible add a info  toaster if search didnot display any results.
        // console.log( item );
        console.log( o.term );
        this.showToast( 'info', 'Member with Portal Id ' + o.term, 'Not Found !!' )
        // console.log( b );
    }

    /**
     * On Member Search
     * @param search
     */
    onMemberSearch( search ): void {
        console.log( search );
    }

    /**
     * Clears all the Fields of the form for fresh entry.
     * @param event
     */
    clearForm( event ): void {
        this.showToast( 'success', 'All Form Details', 'Cleared Successfully !!' );
    }

    /**
     * Submits the Complete Form Details and tries to  clear out the fields once done ,
     * and saves the form details to the DB via Service.
     * @param event
     */
    sendForm( event ): void {
        if ( this.validateAllFields() ) {
            console.log( this.buildMemberDetailObject() );
            this.showToast( 'success', 'Member Added', 'Successfully !!' );
        } else {
            console.log( 'All Fields are not yet valid' );
            this.showToast( 'warning', 'Required Fields Missing', 'Fill All Required Fields' );
        }

    }

    /**
     * Validates all the fields and then presents true if the form is valid or false if there any missing fields.
     * 
     * In here only image file is optional field.
     */
    validateAllFields(): boolean {
        var isFormValid: boolean = this.mfullName ?
            this.mrating &&
                this.memailId &&
                this.mportalId &&
                this.memployeeId &&
                this.mexperience &&
                this.mgender &&
                this.mdesignation &&
                this.misManager &&
                this.mcomments &&
                this.mhobbies &&
                this.mmonth1score &&
                this.mmonth2score &&
                this.mmonth3score &&
                this.mvalueAddScore &&
                this.monQualityScore &&
                this.monTimeScore &&
                this.mprojectDetails &&
                this.mteamName &&
                this.mgender !== 'GENDER' &&
                this.misManager !== 'IS MEMBER MANAGER'
                //  && this.mimageFile 
                ? true : false : false;

        return isFormValid;
    }

    buildMemberDetailObject(): MemberDetails {
        return new MemberDetails( this.mfullName,
            this.memailId,
            this.mportalId,
            this.memployeeId,
            this.mexperience,
            this.mgender,
            this.mdesignation,
            this.misManager,
            this.mcomments,
            this.mhobbies,
            this.mmonth1score,
            this.mmonth2score,
            this.mmonth3score,
            this.mvalueAddScore,
            this.monQualityScore,
            this.monTimeScore,
            this.mprojectDetails,
            this.mteamName,
            this.position,
            this.mrating,
            this.imageFileData // set the image file data rather than the image file URL.
        );
    }
}
