import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { Device } from './device';

@Injectable()
export class StatsService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private socket;

  constructor(private http: Http) { }

  //get all of the devices
  getTypeCounts(): Promise<any> {
    return this.http.get('/app/typecount')
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

  getConditionCounts(): Promise<any> {
    return this.http.get('/app/typecondition')
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
