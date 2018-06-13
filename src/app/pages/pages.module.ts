import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AuthGuardService } from '../auth-guard.service';

const PAGES_COMPONENTS = [
    PagesComponent,
];

@NgModule( {
    imports: [
        PagesRoutingModule,
        ThemeModule,
        DashboardModule,
        MiscellaneousModule,
    ],
    declarations: [
        ...PAGES_COMPONENTS,
    ],
    providers: [AuthGuardService],
} )
export class PagesModule {
}
