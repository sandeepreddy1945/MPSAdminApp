/*tslint:disable*/
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';



@Component( {
    selector: 'ngx-org-chart',
    template: ` <div  id="chart-container"></div>`,
    styleUrls: ['./org-chart.component.scss'],
} )
export class OrgChartComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
