/*tslint:disable*/
import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { of as observableOf, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { switchMap, map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MemberDetailFormService } from './member-detail-form.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TeamDetails } from '../../@model/teamDetails';

// all URL Constants
const DASHBOARD: NbMenuItem = {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
};

const FEATURES: NbMenuItem = {
    title: 'FEATURES',
    group: true,
};

const UIFEATURES: NbMenuItem = {
    title: 'UI Features',
    icon: 'nb-keypad',
    link: '/pages/ui-features',
    children: [
        {
            title: 'Buttons',
            link: '/pages/ui-features/buttons',
        },
        {
            title: 'Grid',
            link: '/pages/ui-features/grid',
        },
        {
            title: 'Icons',
            link: '/pages/ui-features/icons',
        },
        {
            title: 'Modals',
            link: '/pages/ui-features/modals',
        },
        {
            title: 'Popovers',
            link: '/pages/ui-features/popovers',
        },
        {
            title: 'Typography',
            link: '/pages/ui-features/typography',
        },
        {
            title: 'Animated Searches',
            link: '/pages/ui-features/search-fields',
        },
        {
            title: 'Tabs',
            link: '/pages/ui-features/tabs',
        },
    ],
};

const FORMS: NbMenuItem = {
    title: 'Forms',
    icon: 'nb-compose',
    children: [
        {
            title: 'Form Inputs',
            link: '/pages/forms/inputs',
        },
        {
            title: 'Form Layouts',
            link: '/pages/forms/layouts',
        },
        {
            title: 'Member Detail Form',
            link: '/pages/forms/memberDetailForm',
        },
    ],
};

const COMPONENTS: NbMenuItem = {
    title: 'Components',
    icon: 'nb-gear',
    children: [
        {
            title: 'Tree',
            link: '/pages/components/tree',
        }, {
            title: 'Notifications',
            link: '/pages/components/notifications',
        },
    ],
};

const MAPS: NbMenuItem = {
    title: 'Maps',
    icon: 'nb-location',
    children: [
        {
            title: 'Google Maps',
            link: '/pages/maps/gmaps',
        },
        {
            title: 'Leaflet Maps',
            link: '/pages/maps/leaflet',
        },
        {
            title: 'Bubble Maps',
            link: '/pages/maps/bubble',
        },
        {
            title: 'Search Maps',
            link: '/pages/maps/searchmap',
        },
    ],
};

const CHARTS: NbMenuItem = {
    title: 'Charts',
    icon: 'nb-bar-chart',
    children: [
        {
            title: 'Echarts',
            link: '/pages/charts/echarts',
        },
        {
            title: 'Charts.js',
            link: '/pages/charts/chartjs',
        },
        {
            title: 'D3',
            link: '/pages/charts/d3',
        },
        {
            title: 'Enterprise Rx',
            link: '/pages/charts/enterpriserx',
        }, {
            title: 'Pharmacy Rx',
            link: '/pages/charts/pharmacyrx',
        },
        {
            title: 'Pharmaserv',
            link: '/pages/charts/pharmaserv',
        },
        /*{
            title: 'Dynamic Chart',
            link: '/pages/charts/dynamicchart/:name',
        },*/
        {
            title: 'ERX Dynamic Chart',
            link: '/pages/charts/dynamicchart/ERX',
            queryParams: { 'teamName': 'ERX' },
        },
    ],
};

const EDITORS: NbMenuItem = {
    title: 'Editors',
    icon: 'nb-title',
    children: [
        {
            title: 'TinyMCE',
            link: '/pages/editors/tinymce',
        },
        {
            title: 'CKEditor',
            link: '/pages/editors/ckeditor',
        },
        {
            title: 'Profile',
            link: '/pages/editors/profile',
        },
    ],
};

const TABLES: NbMenuItem = {
    title: 'Tables',
    icon: 'nb-tables',
    children: [
        {
            title: 'Member Detais',
            link: '/pages/tables/smart-table',
        },
        {
            title: 'Manager Details',
            link: '/pages/tables/manager-detail',
        },
        {
            title: 'Team Name Details',
            link: '/pages/tables/team-detail',
        },
    ],
};

const MISCELLANEOUS: NbMenuItem = {
    title: 'Miscellaneous',
    icon: 'nb-shuffle',
    children: [
        {
            title: '404',
            link: '/pages/miscellaneous/404',
        },
    ],
};

const AUTH: NbMenuItem = {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
        {
            title: 'Login',
            link: '/auth/login',
        },
        {
            title: 'Register',
            link: '/auth/register',
        },
        {
            title: 'Request Password',
            link: '/auth/request-password',
        },
        {
            title: 'Reset Password',
            link: '/auth/reset-password',
        },
    ],
};

const NEBULAR_ALL_MENU: NbMenuItem[] = [DASHBOARD, FEATURES, UIFEATURES, FORMS, COMPONENTS, MAPS,
    CHARTS, EDITORS, TABLES, MISCELLANEOUS, AUTH];

@Injectable( {
    providedIn: 'root',
} )
export class DynamicMenuService {

    constructor( private memberDetailService: MemberDetailFormService ) { }

    // fetch the data from constants and append it dynamically to a var if required for dynamic display.

    fetchDefaultMenuItems(): Observable<NbMenuItem[]> {


        this.convertToTeamMenuList().forEach( m => {
            let dynamicMenuItems: NbMenuItem = { title: m.title, link: m.link, queryParams: m.queryParams };
            CHARTS.children.push( dynamicMenuItems );
        } );
        console.log( NEBULAR_ALL_MENU );
        return observableOf( NEBULAR_ALL_MENU );
    }

    convertTeamNamedToDetails(): Observable<TeamDetails[]> {
        return this.memberDetailService.fetchTeamDetais();
    }

    convertToTeamMenuList(): NbMenuItem[] {
        let menusArray: NbMenuItem[] = new Array<NbMenuItem>();
        let menus: string[] = new Array();
        this.convertTeamNamedToDetails().subscribe( o => { o.forEach( p => { menus.push( p.teamName ) } ) } );
        menus.forEach( e => {
            let m: NbMenuItem = new NbMenuItem();
            m.title = e;
            m.link = '/pages/charts/dynamicchart/'.concat( e );
            m.queryParams = { 'teamName': e.toString() };
            menusArray.push( m );
        } );

        return menusArray;
    }
}
