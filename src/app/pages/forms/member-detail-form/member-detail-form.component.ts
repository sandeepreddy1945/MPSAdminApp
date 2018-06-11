/*tslint:disable*/
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { MemberDetailFormService } from '../../../@core/data/member-detail-form.service';
import { ManagerDetails } from '../../../@model/ManagerDetails';
import { MemberDetails } from '../../../@model/memberDetails';

@Component( {
    selector: 'member-detail-form',
    templateUrl: './member-detail-form.component.html',
    styleUrls: ['./member-detail-form.component.scss'],

} )
export class MemberDetailFormComponent implements OnInit {

    starRate = 2;
    heartRate = 4;
    mfullName: string;
    managerDetails: ManagerDetails[];
    teamList: string[];
    mmanagerDetails = 1;
    isSelected: boolean;
    constructor( private memberService: MemberDetailFormService ) { }

    ngOnInit() {
        this.mfullName = 'Sandeep Reddy';
        this.getManagerDetailsList();
        this.getTeamDetaisList();
        this.isSelected = true;
        // just a dummy value
        this.mmanagerDetails = 1;
    }
    // https://www.learnhowtoprogram.com/javascript/angular-extended/dynamic-routing-navigation page for dynamic routing
    handleFileEvent( event ): void {
        if ( event.target.files && event.target.files[0] ) {
            var reader = new FileReader();
            reader.onload = function( e ) {
                // this is already a base64 result so no need to atob/btoa it.
                var imgData = reader.result;
                console.log( imgData );
            };
            reader.readAsDataURL( event.target.files[0] );
        }
    }

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
}
