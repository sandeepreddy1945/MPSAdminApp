import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { CurrentUser } from '../../../@model/currentUser';
import { defaultImage } from '../../editors/login-profile/DefaultImage';
import { MemberDetails } from '../../../@model/memberDetails';
@Component( {
    selector: 'ngx-team-detail',
    templateUrl: './team-detail.component.html',
    styleUrls: ['./team-detail.component.scss'],
} )
export class TeamDetailComponent implements OnInit {

    teamMembers: CurrentUser[] = [{ name: 'Sandeep', picture: defaultImage.defaultImageData, title: 'Lead' }];
    @Input() teamName: string;
    breakpoint: NbMediaBreakpoint;
    breakpoints: any;
    themeSubscription: any;
    selectedImageData = defaultImage.defaultImageData;

    constructor(
        private themeService: NbThemeService,
        private breakpointService: NbMediaBreakpointsService ) {

        this.breakpoints = this.breakpointService.getBreakpointsMap();
        this.themeSubscription = this.themeService.onMediaQueryChange()
            .subscribe(( [oldValue, newValue] ) => {
                this.breakpoint = newValue;
            } );
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
    }
}
