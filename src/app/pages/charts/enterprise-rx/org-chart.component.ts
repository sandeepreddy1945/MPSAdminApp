/*tslint:disable*/
import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';

@Component( {
    selector: 'ngx-org-chart',
    template: `<nb-card size="large">   
        <nb-user [picture]="picture" [name]="name" [title]="title" size="large"></nb-user>
</nb-card>`,
    styleUrls: ['./org-chart.component.scss'],
} )
export class OrgChartComponent {

    @Input() name: string;
    @Input() title: string;
    @Input() picture: string;
}
