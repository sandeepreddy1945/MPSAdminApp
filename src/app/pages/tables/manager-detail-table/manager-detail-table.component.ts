/*tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import { ManagerDetailService } from '../../../@core/data/manager-detail.service';
import 'style-loader!angular2-toaster/toaster.css';

import { NbAuthSimpleToken, NbAuthService } from '@nebular/auth';

import { ManagerDetails } from '../../../@model/ManagerDetails';

@Component( {
    selector: 'manager-detail-table',
    templateUrl: './manager-detail-table.component.html',
    styleUrls: ['./manager-detail-table.component.scss']
} )
export class ManagerDetailTableComponent implements OnInit {

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
            portalId: {
                title: 'Portal ID',
                type: 'string',
                filter: false,
            },
            name: {
                title: 'Full Name',
                type: 'string',
                filter: false,
            },
            email: {
                title: 'E-mail',
                type: 'string',
                filter: false,
            },
            designation: {
                title: 'Designation',
                type: 'string',
                filter: false,
            },
            experience: {
                title: 'Experience',
                type: 'number',
                filter: false,
            },
        },
    };

    source: LocalDataSource;

    constructor( private service: ManagerDetailService, private toasterService: ToasterService,
        private authService: NbAuthService ) {

    }

    ngOnInit() {
        this.getAllMembers();
        console.log( this.authService.getToken() );
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


    makeToast() {
        this.showToast( this.type, this.title, this.content );
    }

    /**
     * Fetches all the table data and adds it to the table datasource .
     * Called in init method has the advantage that this will instantiate the source with the data source as well.
     */
    getAllMembers(): void {
        this.service.fetchAllManagers().subscribe( o => { this.source = new LocalDataSource( o ) }
            , err => {
                this.onErrorToaster( err.message )
            },
            () => { this.showToast( 'success', 'Manager Table', 'Successfully Loaded !!' ); } );
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
            var data: any = event.data;
            let member: ManagerDetails = new ManagerDetails();
            member.portalId = data.portalId;
            member.email = data.email;
            member.name = data.name;
            member.designation = data.designation;
            member.experience = data.experience;

            this.service.deleteManager( member ).subscribe( o => {
                this.showToast( 'success', 'Member with Portal Id: ' + member.portalId, 'Successfully Deleted !!' );
            }, err => {
                this.onErrorToaster( err.message )
            } );
            event.confirm.resolve();
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
        let member: ManagerDetails = new ManagerDetails();
        member.portalId = data.portalId;
        member.email = data.email;
        member.name = data.name;
        member.designation = data.designation;
        member.experience = data.experience;

        let memberArray: ManagerDetails[] = event.source.data;
        var identifiedMember = memberArray.find(( m: ManagerDetails ) => parseInt( m.portalId.toString() ) === parseInt( member.portalId.toString() ) );
        var isMemberExists: boolean = identifiedMember ? true : false;
        if ( isMemberExists ) {
            // if member exists then show a message indicationg the same
            this.showToast( 'info', 'Member with Portal Id: ' + member.portalId, 'Already Exists !!' );
            event.confirm.reject();
        } else if ( !this.validateMemberJson( member ) ) {
            this.showToast( 'error', 'Some Fields are empty', 'Fill in All Fields' );
            event.confirm.reject();
        }
        else {
            // if member added show success message   
            this.service.addNewManager( member ).subscribe( o => {
                this.showToast( 'success', 'Member with Portal Id: ' + member.portalId, 'Successfully Added !!' );
                event.confirm.resolve();
            }, err => {
                this.onErrorToaster( err.message )
            } );
           
        }

    }

    validateMemberJson( m: ManagerDetails ): boolean {
        var isValid: boolean = m ? m.portalId && m.designation && m.email && m.experience && m.name ? true : false : false;
        return isValid;
    }

    /**
     * Invoked on Edit Action Confirmed on the Table.
     * @param event
     */
    onEditConfirm( event ): void {
        var oldMember: ManagerDetails = event.data;
        var newMember: ManagerDetails = event.newData;

        if ( oldMember == newMember ) {
            this.showToast( 'info', 'No Data Changed', '' );
            event.confirm.reject();
        } else if ( !this.validateMemberJson( newMember ) ) {
            console.log(newMember);
            this.showToast( 'error', 'Some Fields are empty', 'Fill in All Fields' );
            event.confirm.reject();
        } else {
            var memberArray: string[] = [JSON.stringify( oldMember ), JSON.stringify( newMember )];
            this.service.updateManagerDetail( memberArray ).subscribe( o => {
                this.showToast( 'success', 'Member with Portal Id: ' + newMember.portalId, 'Successfully Edited !!' );
            }, err => {
                this.onErrorToaster( err.message )
            } );
            event.confirm.resolve();
        }

        event.confirm.resolve();
    }

    onErrorToaster( s: string ): void {
        this.showToast( 'error', 'Error Occured', s );
    }

    onSearch( query: string = '' ) {

        this.source.setFilter( [
            // fields we want to include in the search
            {
                field: 'portalId',
                search: query,
            },
            {
                field: 'name',
                search: query,
            },
            {
                field: 'email',
                search: query,
            },
            {
                field: 'designation',
                search: query,
            },
            {
                field: 'experience',
                search: query,
            },
        ], false );
        // second parameter specifying whether to perform 'AND' or 'OR' search
        // (meaning all columns should contain search query or at least one)
        // 'AND' by default, so changing to 'OR' by setting false here
    }
}
