/*tslint:disable*/
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component( {
    selector: 'member-detail-form',
    templateUrl: './member-detail-form.component.html',
    styleUrls: ['./member-detail-form.component.scss'],

} )
export class MemberDetailFormComponent implements OnInit {

    starRate = 2;
    heartRate = 4;
    fullName: string;

    managers: string[] = ['Lakshmi', 'Ramana', 'Pradip', 'Lakshmisha'];

    constructor() { }

    ngOnInit() {
        this.fullName = 'Sandeep Reddy';
    }
    // https://www.learnhowtoprogram.com/javascript/angular-extended/dynamic-routing-navigation page for dynamic routing
    handleFileEvent( event ): void {
        if ( event.target.files && event.target.files[0] ) {
            var reader = new FileReader();
            reader.onload = function( e ) {
                // this is already a base64 result so no need to atob/btoa it.
                var imgData = reader.result;
                console.log(imgData);
            };
            reader.readAsDataURL( event.target.files[0] );
        }
    }
}
