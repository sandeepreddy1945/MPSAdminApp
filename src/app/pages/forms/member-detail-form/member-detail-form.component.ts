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
import { defaultImage } from '../../editors/login-profile/DefaultImage';
import 'style-loader!angular2-toaster/toaster.css';
import { FormsModule, EmailValidator, Validator } from '@angular/forms'
import { TeamDetails } from '../../../@model/teamDetails';

@Component( {
    selector: 'member-detail-form',
    templateUrl: './member-detail-form.component.html',
    styleUrls: ['./member-detail-form.component.scss'],

} )
export class MemberDetailFormComponent implements OnInit, OnDestroy {

    // variables used
    starRate = 2;
    managerDetails: ManagerDetails[];
    teamList: TeamDetails[];
    teamComboPick: TeamDetails;
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

    // filed validation object
    isFormSubmitted: boolean = false;
    protected searchClick$: Subscription;

    dropDownClass: string = 'btn btn-primary';
    dangerDropDownClass: string = 'btn btn-danger';

    managerAsync: any;

    constructor( private memberService: MemberDetailFormService, private searchService: NbSearchService,
        private toasterService: ToasterService ) {
        this.searchClick$ = this.searchService.onSearchDeactivate().subscribe( o => { } );
        this.searchService.onSearchDeactivate().pipe( withLatestFrom( this.searchService.onSearchSubmit(),
            this.searchService.onSearchActivate() ) )
            .subscribe(( [item, searchObservable, searchActivateObs]: [any, any, any] ) => { this.handleSearchSelection( item, searchObservable, searchActivateObs ) } );

        // important point constructor call before ngOnit
        // moving service calls a head.
        this.getManagerDetailsList();
        this.getTeamDetaisList();
        this.getGenderList();
        this.getManagerCheckList();

        this.managerAsync = this.memberService.fecthManagerDetails();
    }

    ngOnInit() {
        // this.mfullName = 'Sandeep Reddy';

        // add default for team Pick List as well
        let tmD = new TeamDetails();
        tmD.managerPortalId = '0';
        tmD.teamName = 'Select Team Name';
        this.teamComboPick = this.teamList ? this.teamList[0] : tmD;

        // assign the managers drop down with the first value applicable.
        console.log( this.managerDetails );
        this.position = this.managerDetails ? this.managerDetails[0] : new ManagerDetails( '0', 'Managers To Select' );

        // set the  frame image to default image or the image value retrieve from db
        // TODO to make the changes to retrieve from the service call.
        this.imageFileData = defaultImage.defaultImageData;
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
        this.memberService.fecthManagerDetails().subscribe( o => { this.managerDetails = o; console.log( o ) } );
    }

    /**
     * Fetches the Team Details List / List of Team Names.
     */
    getTeamDetaisList(): void {
        this.memberService.fetchTeamDetais().subscribe( o => { this.teamList = o; console.log( o ); this.teamComboPick = o[0]; } );
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
        //search Member
        this.memberService.fetchMemberByPortalId( o.term ).subscribe(
            o => { console.log( o ), this.reLoadValuesToScreen( o ) },
            err => { this.onErrorToaster( 'Member Not Found' ) },
            () => { this.showToast( 'info', 'Member with Portal Id ' + o.term, ' Found !!' ) }
        );
        // console.log( b );
    }

    /**
     * ReLoads The Search Results To The Screen.
     * @param m
     */
    reLoadValuesToScreen( m: MemberDetails ): void {

        this.mfullName = m.fullName;
        this.memailId = m.email;
        this.mportalId = m.portalId;
        this.memployeeId = m.employeeId;
        this.mexperience = m.experience;
        this.mgender = m.gender;
        this.mdesignation = m.designation;
        this.misManager = m.isManager;
        this.mcomments = m.comments;
        this.mhobbies = m.hobbies;
        this.mmonth1score = m.month1score;
        this.mmonth2score = m.month2score;
        this.mmonth3score = m.month3score;
        this.mvalueAddScore = m.valueAddScore;
        this.monQualityScore = m.onQualityScore;
        this.monTimeScore = m.onTimeScore;
        this.mprojectDetails = m.projectDetails;
        this.teamComboPick = m.teamDetails;
        this.position = m.managerDetails;
        this.mrating = m.rating;
        this.imageFileData = m.imageData ? m.imageData : defaultImage.defaultImageData;
        // combobox checks
        this.genderComboPick = m.gender;
        this.managerComboPick = m.isManager;
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
        this.mfullName = '';
        this.memailId = '';
        this.mportalId = '';
        this.memployeeId = '';
        this.mexperience = null;
        this.mgender = '';
        this.mdesignation = '';
        this.misManager = '';
        this.mcomments = '';
        this.mhobbies = '';
        this.mmonth1score = null;
        this.mmonth2score = null;
        this.mmonth3score = null;
        this.mvalueAddScore = null;
        this.monQualityScore = null;
        this.monTimeScore = null;
        this.mprojectDetails = '';
        this.teamComboPick = this.teamList[0];
        this.position = this.managerDetails[0];
        this.mrating = 2;
        this.imageFileData = defaultImage.defaultImageData;
        // combobox checks
        this.genderComboPick = '';
        this.managerComboPick = '';

        this.showToast( 'success', 'All Form Details', 'Cleared Successfully !!' );
    }

    /**
     * Submits the Complete Form Details and tries to  clear out the fields once done ,
     * and saves the form details to the DB via Service.
     * @param event
     */
    sendForm( event ): void {
        this.isFormSubmitted = true;
        if ( this.validateAllFields() ) {
            // console.log( this.buildMemberDetailObject() );
            // as form is sucessfully validated and done.
            this.isFormSubmitted = false;
            // save the details
            this.memberService.saveMemberDetails( this.buildMemberDetailObject() )
                .subscribe(
                o => { console.log( o ) },
                err => { this.onErrorToaster( err.message ) },
                () => { this.showToast( 'success', 'Member Added', 'Successfully !!' ); } );

        } else {
            console.log( 'All Fields are not yet valid' );
            this.showToast( 'warning', 'Required Fields Missing', 'Fill All Required Fields' );
        }

    }

    setSelectedTeam( p: TeamDetails ): void {
        this.teamComboPick = p;
    }

    /**
     * Validates all the fields and then presents true if the form is valid or false if there any missing fields.
     * 
     * In here only image file is optional field.
     */
    validateAllFields(): boolean {
        let isFormValid: boolean =
            this.mfullName ?
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
                    this.teamComboPick &&
                    this.mgender !== 'GENDER' &&
                    this.misManager !== 'IS MEMBER MANAGER' &&
                    this.managerComboPick // check to see if no manager is picked then stop him

                    //  && this.mimageFile 
                    ? true : false : false;
        console.log( isFormValid );
        return isFormValid;
    }

    buildMemberDetailObject(): MemberDetails {
        return new MemberDetails(
            this.mfullName,
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
            this.teamComboPick,
            this.position,
            this.mrating,
            this.imageFileData // set the image file data rather than the image file URL.
        );
    }

    onErrorToaster( s: string ): void {
        this.showToast( 'error', 'Error Occured', s );
    }
}
