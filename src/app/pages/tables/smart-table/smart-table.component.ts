/*tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import 'style-loader!angular2-toaster/toaster.css';

import { NbAuthSimpleToken, NbAuthService } from '@nebular/auth';

import { Member } from '../../../@model/member';

@Component( {
    selector: 'ngx-smart-table',
    templateUrl: './smart-table.component.html',
    styleUrls: ['./smart-table.component.scss']
} )
/*For Doctumentation on this visit https://akveo.github.io/ng2-smart-table/#/documentation*/
export class SmartTableComponent implements OnInit {

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
            fullName: {
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

    constructor( private service: SmartTableService, private toasterService: ToasterService,
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

    types: string[] = ['default', 'info', 'success', 'warning', 'error'];
    animations: string[] = ['fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'];
    positions: string[] = ['toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center',
        'toast-top-right', 'toast-bottom-right', 'toast-bottom-center', 'toast-bottom-left', 'toast-center'];

    quotes = [
        { title: null, body: 'We rock at <i>Angular</i>' },
        { title: null, body: 'Titles are not always needed' },
        { title: null, body: 'Toastr rock!' },
        { title: 'What about nice html?', body: '<b>Sure you <em>can!</em></b>' },
    ];

    makeToast() {
        this.showToast( this.type, this.title, this.content );
    }

    /**
     * Fetches all the table data and adds it to the table datasource .
     * Called in init method has the advantage that this will instantiate the source with the data source as well.
     */
    getAllMembers(): void {
        this.service.reteriveAllMembers().subscribe( o => { this.source = new LocalDataSource( o ) }
            , err => {
                this.onErrorToaster( err.message )
            },
            () => { this.showToast( 'success', 'Member Table', 'Successfully Loaded !!' ); } );
    }

    openRandomToast() {
        const typeIndex = Math.floor( Math.random() * this.types.length );
        const quoteIndex = Math.floor( Math.random() * this.quotes.length );
        const type = this.types[typeIndex];
        const quote = this.quotes[quoteIndex];

        this.showToast( type, quote.title, quote.body );
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
            var member: Member = new Member( data.portalId, data.fullName, data.email,
                data.designation, data.experience );
            this.service.deleteMember( member ).subscribe( o => {
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
        var member: Member = new Member( data.portalId, data.fullName, data.email,
            data.designation, data.experience );

        var memberArray: Member[] = event.source.data;
        var identifiedMember = memberArray.find(( m: Member ) => parseInt( m.portalId.toString() ) === parseInt( member.portalId.toString() ) );
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
            this.service.saveNewEntry( member ).subscribe( o => {
                this.showToast( 'success', 'Member with Portal Id: ' + member.portalId, 'Successfully Added !!' );
            }, err => {
                this.onErrorToaster( err.message )
            } );
            event.confirm.resolve();
        }

    }

    validateMemberJson( m: Member ): boolean {
        var isValid: boolean = m ? m.portalId && m.designation && m.email && m.experience && m.fullName ? true : false : false;
        return isValid;
    }

    /**
     * Invoked on Edit Action Confirmed on the Table.
     * @param event
     */
    onEditConfirm( event ): void {
        var oldMember: Member = event.data;
        var newMember: Member = event.newData;

        if ( oldMember == newMember ) {
            this.showToast( 'info', 'No Data Changed', '' );
            event.confirm.reject();
        } else if ( !this.validateMemberJson( newMember ) ) {
            this.showToast( 'error', 'Some Fields are empty', 'Fill in All Fields' );
            event.confirm.reject();
        } else {
            var memberArray: string[] = [JSON.stringify( oldMember ), JSON.stringify( newMember )];
            this.service.editOldEntry( memberArray ).subscribe( o => {
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
                    field: 'fullName',
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
