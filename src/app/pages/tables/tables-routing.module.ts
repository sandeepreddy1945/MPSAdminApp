import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { ManagerDetailTableComponent } from './manager-detail-table/manager-detail-table.component';
import { TeamDetailTableComponent } from './team-detail-table/team-detail-table.component';

const routes: Routes = [{
    path: '',
    component: TablesComponent,
    children: [{
        path: 'smart-table',
        component: SmartTableComponent,
    },
    {
        path: 'manager-detail',
        component: ManagerDetailTableComponent,
    },
    {
        path: 'team-detail',
        component: TeamDetailTableComponent,
    }],
}];

@NgModule( {
    imports: [RouterModule.forChild( routes )],
    exports: [RouterModule],
} )
export class TablesRoutingModule { }

export const routedComponents = [
    TablesComponent,
    SmartTableComponent,
    TeamDetailTableComponent,
    ManagerDetailTableComponent,
];
