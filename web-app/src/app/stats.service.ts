import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { Device } from './device';

@Injectable()
export class StatsService {

  private socket;

  /**
  * @http: used to make get rquests to the Nodejs server
  */
  constructor(private http: Http) { }

  /**
  * Use the /app/typecount endpoint to retrieve the aggregate statistical data
  * regarding the number of active shipments per shipment category. Comes in
  * the form of {"Class0": "#", "Class1": "#", ..., "Class15": "#"}
  */
  getTypeCounts(): Promise<any> {
    return this.http.get('/app/typecount')
               .timeout(1000*60*2, new Error('timeout exceeded'))
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

  /**
  * Use the /app/typecondition endpoint to retrieve the aggregate statistical
  * data regarding the number of active shipments per shipment category,
  * grouped by "good condition" and "poor condition". This data comes in the
  * form of {"good": {"Class0": "#", "Class1": "#", ..., "Class15": "#"},
  * "poor": {"Class0": "#", "Class1": "#", ..., "Class15": "#"}}
  */
  getConditionCounts(): Promise<any> {
    return this.http.get('/app/typecondition')
               .timeout(1000*60*2, new Error('timeout exceeded'))
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

  /**
  * Handle any errors that may occur.
  */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
