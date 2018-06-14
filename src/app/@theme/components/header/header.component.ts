/*tslint:disable*/
import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService, NbMenuItem } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { delay, withLatestFrom, tap, filter } from 'rxjs/operators';

@Component( {
    selector: 'ngx-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
} )
export class HeaderComponent implements OnInit {


    @Input() position = 'normal';

    user: any;

    userMenu: NbMenuItem[];

    constructor( private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private userService: UserService,
        private analyticsService: AnalyticsService ) {
        /*this.menuService.onItemClick().pipe( tap( val => { console.log( val ) } ), filter(( { tag } ) => tag === 'logOutContextMenu' ) )
            .subscribe( o => { console.log( o ) } );
        this.menuService.onItemSelect().pipe( tap( val => { console.log( val ) } ), filter(( { tag } ) => tag === 'logOutContextMenu' ) )
            .subscribe( o => { console.log( o ) } );*/
    }

    ngOnInit() {
        this.userService.getUsers()
            .subscribe(( users: any ) => this.user = users.nick );
        this.userMenu = [{ title: 'Profile', link: '/pages/editors/profile' }, { title: 'Log out', link: '/auth/sign-out' }];
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle( true, 'menu-sidebar' );
        return false;
    }

    toggleSettings(): boolean {
        this.sidebarService.toggle( false, 'settings-sidebar' );
        return false;
    }

    goToHome() {
        this.menuService.navigateHome();
    }

    startSearch() {
        this.analyticsService.trackEvent( 'startSearch' );
    }
}
