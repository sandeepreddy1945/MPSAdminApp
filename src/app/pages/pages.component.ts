import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { delay, withLatestFrom, tap } from 'rxjs/operators';

import { MENU_ITEMS } from './pages-menu';
import { DynamicMenuService } from '../@core/data/dynamic-menu.service';
import { NbMenuItem } from '@nebular/theme';

@Component( {
    selector: 'ngx-pages',
    template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
} )
export class PagesComponent implements OnInit {

    menu: NbMenuItem[];  // = MENU_ITEMS;

    constructor( private dynamicMenu: DynamicMenuService ) { }

    ngOnInit() {
        this.fetchDisplayMenuOptions();
    }

    /**
     * Fetches The Menu Display Options via a service call to dynamically load
     * the menu items rather than letting it static.
     */
    fetchDisplayMenuOptions(): void {
        this.dynamicMenu.fetchDefaultMenuItems().pipe().subscribe( o => { this.menu = o } );
    }
}
