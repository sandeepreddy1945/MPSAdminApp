import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartsComponent } from './charts.component';
import { EchartsComponent } from './echarts/echarts.component';
import { D3Component } from './d3/d3.component';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { EnterpriseRxComponent } from './enterprise-rx/enterprise-rx.component';
import { PharmaServComponent } from './pharma-serv/pharma-serv.component';
import { PharmacyRxComponent } from './pharmacy-rx/pharmacy-rx.component';

const routes: Routes = [{
    path: '',
    component: ChartsComponent,
    children: [{
        path: 'echarts',
        component: EchartsComponent,
    }, {
        path: 'd3',
        component: D3Component,
    }, {
        path: 'chartjs',
        component: ChartjsComponent,
    }, {
        path: 'enterpriserx',
        component: EnterpriseRxComponent,
    }, {
        path: 'pharmaserv',
        component: PharmaServComponent,
    }, {
        path: 'pharmacyrx',
        component: PharmacyRxComponent,
    }],
}];

@NgModule( {
    imports: [RouterModule.forChild( routes )],
    exports: [RouterModule],
} )
export class ChartsRoutingModule { }

export const routedComponents = [
    ChartsComponent,
    EchartsComponent,
    D3Component,
    ChartjsComponent,
];
