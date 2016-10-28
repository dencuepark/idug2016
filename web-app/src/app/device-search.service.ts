import { Injectable }     from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { Device } from './device';

@Injectable()
export class DeviceSearchService {

  /**
  * @http: used to make get rquests to the Nodejs server
  */
  constructor(private http: Http) {}

  /**
  * Return an observable of an array of devices from the /app/search endpoint
  * which takes the search term and returns any partial matches
  */
  search(term: string): Observable<Device[]> {
    return this.http
               .get(`/app/search/${term}`)
               .timeout(1000*60*2, new Error('timeout exceeded'))
               .map((r: Response) => r.json().data as Device[]);
  }

}
