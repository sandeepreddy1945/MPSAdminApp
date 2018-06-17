/*tslint:disable*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ManagerDetails } from '../../@model/ManagerDetails';

const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );

const fetchAllManagers: string = environment.devServerURL + '/manager/list';
const addNewManager: string = environment.devServerURL + '/manager/addManager';
const deleteManager: string = environment.devServerURL + '/manager/deleteManager';
const deleteManagerByBoundary: string = environment.devServerURL + '/manager/delete/manager'
const editManagerUrl: string = environment.devServerURL + '/manager/editManager';

@Injectable( {
    providedIn: 'root',

} )
export class ManagerDetailService {

    constructor( private httpClient: HttpClient ) { }

    /**
     * Returns an Observable List of All the Managers Available
     */
    fetchAllManagers(): Observable<ManagerDetails[]> {
        return this.httpClient.get<ManagerDetails[]>( fetchAllManagers, { headers: headers } );
    }

    /**
     * Check for duplicates before adding.
     */
    addNewManager( m: ManagerDetails ): Observable<ManagerDetails> {
        return this.httpClient.post<ManagerDetails>( addNewManager, JSON.stringify( m ), { headers: headers } );
    }

    /**
     * @todo : before deleting a manager need to check if the manager is already 
     * related to some other team.
     */
    deleteManager( m: ManagerDetails ): Observable<ManagerDetails> {
        return this.httpClient.delete<ManagerDetails>( deleteManager, { headers: headers, params: { 'portalId': m.portalId } } );
    }

    deleteManagerByBoundary( m: ManagerDetails ): Observable<ManagerDetails> {
        return this.httpClient.post<ManagerDetails>( deleteManagerByBoundary, JSON.stringify( m ), { headers: headers } );
    }
    
    updateManagerDetail(m: string[]): Observable<ManagerDetails> {
        return this.httpClient.post<ManagerDetails>( editManagerUrl, JSON.stringify( m ), { headers: headers } );
    }

}
