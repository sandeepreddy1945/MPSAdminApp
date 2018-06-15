/*tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component( {
    selector: 'dynamic-chart-display',
    templateUrl: './dynamic-chart-display.component.html',
    styleUrls: ['./dynamic-chart-display.component.scss'],
} )
export class DynamicChartDisplayComponent implements OnInit {

    pageName: string;
    constructor( private activatedRoute: ActivatedRoute ) { }

    ngOnInit() {
        //  this.activatedRoute.queryParamMap.subscribe( o => { console.log( o ) } );
        console.log( this.activatedRoute.snapshot.paramMap.get( 'name' ) );
        this.activatedRoute.queryParams.subscribe( o => { console.log( o ), this.pageName = o.teamName } );
        // this.pageName = this.activatedRoute.snapshot.paramMap.get( 'name' );
        // console.log( this.activatedRoute.url );
    }

}
