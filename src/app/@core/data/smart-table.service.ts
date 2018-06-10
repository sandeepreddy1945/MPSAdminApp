/*tslint:disable*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Member } from '../../@model/member';
import { environment } from '../../../environments/environment';

const saveEndPoint: string = environment.devServerURL + '/api/member/save';
const updateEndPoint: string = environment.devServerURL + '/api/member/update';
const retriveAllEndPoint: string = environment.devServerURL + '/api/member/reteriveAll';
const deleteMemberEndPoint: string = environment.devServerURL + '/api/member/deleteMember';
const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );
// const options = new RequestOptions({ headers: headers });
@Injectable()
export class SmartTableService {

    constructor( private httpClient: HttpClient ) {

    }


    /*This is Just Sample Data for testing purpose.*/
    data: Member[] = [/*new Member( '100277', 'Sandeep Reddy', 'SandeepReddy@gmail.com', 'Team Lead', 3.2 )*/];

    /**
     * Not Currently Used .
     */
    getData() {
        // this.reteriveAllMembersAndAdd( this.reteriveAllMembers() );
        this.getAllMembers();
        return this.data;
    }

    /**
     * Makes a Service call and adds pushes it to server for storage
     * @param m
     */
    saveNewEntry( m: Member ): Observable<Member> {
        return this.httpClient.post<Member>( saveEndPoint, JSON.stringify( m ), { headers: headers } );
    }

    /**
     * EDits and Old Entry and pushes it to server
     * @param m
     */
    editOldEntry( m: string[] ): Observable<Member> {
        return this.httpClient.post<Member>( updateEndPoint, JSON.stringify( m ), { headers: headers } );
    }

    /**
     * Reterives all the members as an observable array .
     */
    reteriveAllMembers(): Observable<Member[]> {
        return this.httpClient.get<Member[]>( retriveAllEndPoint, { headers: headers } );
    }

    /**
     * Reterives all the members as an observable array and condenses it to member array.
     */
    getAllMembers(): void {
        this.httpClient.get<Member[]>( retriveAllEndPoint, { headers: headers } )
            .subscribe( o => { this.constructMemberFromList( o ) } );
    }


    /**
     * Reterives all the members as an observable array and condenses it to member array.
     */
    reteriveAllMembersAndAdd( m: Observable<Member[]> ): void {
        m.subscribe( o => { this.constructMemberFromList( o ) },
            onerror => { console.log( onerror ) } );
    }

    /**
     * Consrtucts an array from the List Given .
     * @param mArray
     */
    constructMemberFromList( mArray: Array<any> ) {
        mArray.forEach( m => {
            this.data.push( new Member( m.portalId, m.fullName, m.email, m.designation, m.experience ) );
        } );
    }

    /**
     * Deletes a member from the Table and makes a server call to delete from back end as well.
     * Sends the portal Id in the Url to make the call and delete the member.
     * @param m
     */
    deleteMember( m: Member ): Observable<any> {
        return this.httpClient.delete( deleteMemberEndPoint + '/' + m.portalId, { headers: headers } );
    }

    deleteMemberByPortalId( m: string ): Observable<any> {
        return this.httpClient.delete( deleteMemberEndPoint + '/' + m, { headers: headers } );
    }

    deleteMemberByPost( m: Member ): Observable<Member> {
        return this.httpClient.post<Member>( deleteMemberEndPoint, JSON.stringify( m ), { headers: headers } );
    }
}
