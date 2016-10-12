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

  getTypesMessages(){
    let observable = new Observable(observer => {
      this.socket = io('http://localhost:3000');
      this.socket.on('typecount', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  getConditionMessages(){ //test
    let observable = new Observable(observer => {
      this.socket = io('http://localhost:3000');
      this.socket.on('typecondition', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  // public getInstanceStatus(): Observable<any> {
  //    let websocket = new WebSocket('ws://' + window.location.hostname + ':' + window.location.port, 'sinedata');
  //    websocket.onopen = (evt: any) => {
  //     console.log('This websocket is open!');
  //    };
  //
  //    return Observable.create((observer: any) => {
  //        websocket.onmessage = (evt: any) => {
  //            observer.next(evt);
  //        };
  //    })
  //    .map((res: any) => res.data)
  //    .share();
  //  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
