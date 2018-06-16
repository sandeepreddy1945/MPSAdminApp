import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../../../@model/currentUser';
import { defaultImage } from '../../editors/login-profile/DefaultImage';

@Component( {
    selector: 'enterprise-rx',
    templateUrl: './enterprise-rx.component.html',
    styleUrls: ['./enterprise-rx.component.scss'],
} )
export class EnterpriseRxComponent implements OnInit {

    teamMembersP: CurrentUser[] = [{ name: 'Sandeep', picture: defaultImage.defaultImageData, title: 'Lead' }] ;
    teamMs: string = JSON.stringify(this.teamMembersP);
    constructor() { }
    ngOnInit() {
    }

}
