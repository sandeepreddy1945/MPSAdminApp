import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { TeamDetailsService } from '../../@core/data/team-details.service';
import { ToasterModule } from 'angular2-toaster';
import { ManagerDetailTableComponent } from './manager-detail-table/manager-detail-table.component';
import { TeamDetailTableComponent } from './team-detail-table/team-detail-table.component';

@NgModule( {
    imports: [
        ThemeModule,
        TablesRoutingModule,
        Ng2SmartTableModule,
        ToasterModule.forRoot(),
    ],
    declarations: [
        ...routedComponents,
    ],
    providers: [
        SmartTableService,
        TeamDetailsService,
    ],
} )
export class TablesModule { }
