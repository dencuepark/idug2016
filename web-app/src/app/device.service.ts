import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Device } from './device';
import { DeviceRecords } from './device-records';
import { DeviceHistory } from './device-history';

@Injectable()
export class DeviceService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  //given an id, get all the devices, then search by id
  getDevice(DeviceId: string): Promise<Device> {
    return this.http.get(`/app/device/${DeviceId}`)
               .timeout(6000000, new Error('timeout exceeded'))
               .toPromise()
               .then(response => response.json().data as Device)
               .catch(this.handleError);
  }

  //get the highest values for the specified device
  getDeviceRecords(DeviceId: string): Promise<DeviceRecords> {
    return this.http.get(`/app/records/${DeviceId}`)
               .timeout(6000000, new Error('timeout exceeded'))
               .toPromise()
               .then(response => response.json().data as DeviceRecords)
               .catch(this.handleError);
  }

  getDeviceHistory(DeviceId: string): Promise<DeviceHistory> {
    return this.http.get(`/app/history/${DeviceId}`)
               .timeout(6000000, new Error('timeout exceeded'))
               .toPromise()
               .then(response => response.json().data as DeviceHistory)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
