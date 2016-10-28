import { Injectable }     from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { Device } from './device';

@Injectable()
export class DeviceSearchService {

  constructor(private http: Http) {}
  search(term: string): Observable<Device[]> {
    return this.http
               /*.get(`/app/test/?DeviceId=${term}`)*/
               .get(`/app/search/${term}`)
               .timeout(6000000, new Error('timeout exceeded'))
               .map((r: Response) => r.json().data as Device[]);
  }

}
