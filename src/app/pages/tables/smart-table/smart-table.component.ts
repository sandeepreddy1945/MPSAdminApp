/*tslint:disable*/
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';

@Component( {
    selector: 'ngx-smart-table',
    templateUrl: './smart-table.component.html',
    styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
} )
/*For Doctumentation on this visit https://akveo.github.io/ng2-smart-table/#/documentation*/
export class SmartTableComponent {

    settings = {
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            id: {
                title: 'Portal ID',
                type: 'number',
                filter: false,
            },
            firstName: {
                title: 'Full Name',
                type: 'string',
                filter: false,
            },
            lastName: {
                title: 'Last Name',
                type: 'string',
                filter: false,
            },
            username: {
                title: 'Username',
                type: 'string',
                filter: false,
            },
            email: {
                title: 'E-mail',
                type: 'string',
                filter: false,
            },
            age: {
                title: 'Age',
                type: 'number',
                filter: false,
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor( private service: SmartTableService ) {
        const data = this.service.getData();
        this.source.load( data );
    }

    onDeleteConfirm( event ): void {
        if ( window.confirm( 'Are you sure you want to delete?' ) ) {
            console.log( event.data );
            event.confirm.resolve();
        } else {
            console.log( event.data );
            event.confirm.reject();
        }
    }

    /**
     * Invoked on Create Action Selected in Table
     * @param event
     */
    onCreateConfirm( event ): void {

    }

    /**
     * Invoked on Edit Action Confirmed on the Table.
     * @param event
     */
    onEditConfirm( event ): void {
        console.log( event.data );
        console.log(event.newData);
        console.log(event.source);
    }

    onSearch( query: string = '' ) {
        if ( query ) {
            this.source.setFilter( [
                // fields we want to include in the search
                {
                    field: 'id',
                    search: query,
                },
                {
                    field: 'name',
                    search: query,
                },
                {
                    field: 'username',
                    search: query,
                },
                {
                    field: 'email',
                    search: query,
                },
            ], false );
            // second parameter specifying whether to perform 'AND' or 'OR' search
            // (meaning all columns should contain search query or at least one)
            // 'AND' by default, so changing to 'OR' by setting false here
        }
    }
}
