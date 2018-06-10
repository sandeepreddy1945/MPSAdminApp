/*tslint:disable*/
import { Component, OnInit } from '@angular/core';

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

    handleFileEvent( event ): void {
        console.log( event );
        var reader = new FileReader();
        console.log( event.target.files[0] );
        console.log( window.URL.createObjectURL( event.target.files[0] ) );
        reader.readAsDataURL( event.target.files[0] );
    }
}
