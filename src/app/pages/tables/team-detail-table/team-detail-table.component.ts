/*tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import { TeamDetailsService } from '../../../@core/data/team-details.service';
import 'style-loader!angular2-toaster/toaster.css';

import { NbAuthSimpleToken, NbAuthService } from '@nebular/auth';
import { ManagerDetailService } from '../../../@core/data/manager-detail.service';
import { ManagerDetails } from '../../../@model/ManagerDetails';

import { Member } from '../../../@model/member';
import { TeamDetails } from '../../../@model/teamDetails';


@Component( {
    selector: 'team-detail-table',
    templateUrl: './team-detail-table.component.html',
    styleUrls: ['./team-detail-table.component.scss']
} )
export class TeamDetailTableComponent implements OnInit {

    settings = {
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmCreate: true,
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmSave: true,
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            teamName: {
                title: 'Team Name',
                type: 'string',
                filter: false,
            },
            projectName: {
                title: 'Project Name',
                type: 'string',
                filter: false,
            },
            managerPortalId: {
                title: 'Managers Portal Id',
                type: 'string',
                filter: false,
            },
        },
    };

    source: LocalDataSource;
    managerList: ManagerDetails[];

    constructor( private toasterService: ToasterService,
        private authService: NbAuthService, private teamDetailService: TeamDetailsService,
        private managerService: ManagerDetailService ) {

    }

    ngOnInit() {
        this.getAllMembers();
        console.log( this.authService.getToken() );
        // fetch all the managers for validation purpose.
        this.managerService.fetchAllManagers().subscribe( o => { this.managerList = o; console.log( o ) },
            err => {
                this.onErrorToaster( err.message );
                console.log( err.error );
            } );
    }


    config: ToasterConfig;

    position = 'toast-top-right';
    animationType = 'fade';
    title = 'HI there!';
    content = `I'm cool toaster!`;
    timeout = 5000;
    toastsLimit = 5;
    type = 'default';

    isNewestOnTop = true;
    isHideOnClick = true;
    isDuplicatesPrevented = false;
    isCloseButton = true;

    /**
     * Fetches all the table data and adds it to the table datasource .
     * Called in init method has the advantage that this will instantiate the source with the data source as well.
     */
    getAllMembers(): void {

        this.teamDetailService.fetchAllTeams().subscribe( o => { this.source = new LocalDataSource( o ) },
            err => {
                this.onErrorToaster( err.message );
                console.log( err.error );
            },
            () => { this.showToast( 'success', 'Team Names', 'Successfully Loaded !!' ) } );
    }


    private showToast( type: string, title: string, body: string ) {
        this.config = new ToasterConfig( {
            positionClass: this.position,
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

    clearToasts() {
        this.toasterService.clear();
    }

    onDeleteConfirm( event ): void {
        if ( window.confirm( 'Are you sure you want to delete?' ) ) {
            let data: any = event.data;
            let tm = new TeamDetails();
            tm.teamName = data.teamName;
            tm.projectName = data.projectName;
            tm.managerPortalId = data.managerPortalId;

            this.teamDetailService.deleteTeam( tm ).subscribe( o => {
                this.showToast( 'success', 'Team : ' + tm.teamName, 'Successfully Deeted' );

            },
                err => { this.onErrorToaster( err.message ); },
                () => { event.confirm.resolve(); } );

        } else {
            console.log( event.data );
            event.confirm.reject();
        }
    }

    /**
     * Invoked on Create Action Selected in Table.
     * event.source.data  contans full table data.
     * @param event
     */
    onCreateConfirm( event ): void {
        var data: any = event.newData;
        let tm = new TeamDetails();
        tm.teamName = data.teamName;
        tm.projectName = data.projectName;
        tm.managerPortalId = data.managerPortalId;

        var teamArray: TeamDetails[] = event.source.data;
        var identifiedMember = teamArray.find(( m: TeamDetails ) => m.teamName.toLowerCase() == tm.teamName.toLowerCase() );
        var isMemberExists: boolean = identifiedMember ? true : false;
        if ( isMemberExists ) {
            // if member exists then show a message indicationg the same
            this.showToast( 'info', 'Team with Name: ' + tm.teamName, 'Already Exists !!' );
            event.confirm.reject();
        } else if ( !this.validateMemberJson( tm ) ) {
            this.showToast( 'error', 'Some Fields are empty', 'Fill in All Fields' );
            event.confirm.reject();
        } else if ( !this.checkIfManagerWithPortalIdExists( tm.managerPortalId ) ) {
            this.showToast( 'warning', 'Manager With Portal' + tm.managerPortalId, 'Doesnot exist.!!' );
            event.confirm.reject();
        }
        else {
            let tm = new TeamDetails();
            tm.teamName = data.teamName;
            tm.projectName = data.projectName;
            tm.managerPortalId = data.managerPortalId;
            // if member added show success message   
            this.teamDetailService.addNewTeam( tm ).subscribe( o => {
                this.showToast( 'success', 'Team Name: ' + tm.teamName, 'Successfully Added !!' );
            }, err => {
                this.onErrorToaster( err.message )
            } );
            event.confirm.resolve();
        }

    }

    validateMemberJson( m: TeamDetails ): boolean {
        var isValid: boolean = m ? m.managerPortalId && m.projectName && m.teamName ? true : false : false;
        return isValid;
    }

    /**
     * Invoked on Edit Action Confirmed on the Table.
     * @param event
     */
    onEditConfirm( event ): void {
        var oldTeamDetails: TeamDetails = event.data;
        var newTeamDetails: TeamDetails = event.newData;

        if ( oldTeamDetails == newTeamDetails ) {
            this.showToast( 'info', 'No Data Changed', '' );
            event.confirm.reject();
        } else if ( !this.validateMemberJson( newTeamDetails ) ) {
            this.showToast( 'error', 'Some Fields are empty', 'Fill in All Fields' );
            event.confirm.reject();
        } else if ( !this.checkIfManagerWithPortalIdExists( newTeamDetails.managerPortalId ) ) {
            this.showToast( 'warning', 'Manager With Portal' + newTeamDetails.managerPortalId, 'Doesnot exist.!!' );
            event.confirm.reject();
        }
        else {
            var memberArray: string[] = [JSON.stringify( oldTeamDetails ), JSON.stringify( newTeamDetails )];
            this.teamDetailService.editTeamDetails( memberArray ).subscribe( o => {
                this.showToast( 'success', 'Team Details: ' + newTeamDetails.teamName, 'Successfully Edited !!' );
            }, err => {
                this.onErrorToaster( err.message )
            } );
            event.confirm.resolve();
        }
    }

    onErrorToaster( s: string ): void {
        this.showToast( 'error', 'Error Occured', s );
    }

    onSearch( query: string = '' ) {

        this.source.setFilter( [
            // fields we want to include in the search
            {
                field: 'teamName',
                search: query,
            },
            {
                field: 'projectName',
                search: query,
            },
            {
                field: 'managerPortalId',
                search: query,
            },
        ], false );
        // second parameter specifying whether to perform 'AND' or 'OR' search
        // (meaning all columns should contain search query or at least one)
        // 'AND' by default, so changing to 'OR' by setting false here
    }

    /**
     * Returns true if manager with portal exists or else false;
     * @param m -> portal id
     */
    checkIfManagerWithPortalIdExists( m: string ): boolean {
        let mg: ManagerDetails = this.managerList.find( n => n.portalId.toString() == m.toString() );
        return mg ? true : false;
    }
}
