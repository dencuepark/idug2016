import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Device } from './device';

@Injectable()
export class DeviceService {

  private headers = new Headers({'Content-Type': 'application/json'});
  //private devicesUrl = 'app/devices';  // URL to web api
  private devicesUrl = '/app/test';  // URL to web api

  constructor(private http: Http) { }

  //get all of the devices
  getDevices(): Promise<Device[]> {
    return this.http.get(this.devicesUrl)
               .toPromise()
               .then(response => response.json().data as Device[])
               .catch(this.handleError);
  }

  getDeviceSearch(DeviceId: string){
    return this.http.get(`/app/test/${DeviceId}`)
               .toPromise()
               .then(response => response.json().data as Device[])
               .catch(this.handleError);
  }

  //given an id, get all the devices, then search by id
  getDevice(DeviceId: string): Promise<Device> {
    return this.getDeviceSearch(DeviceId)
               .then(devices => devices.find(device => device.DeviceId === DeviceId));
  }

  delete(DeviceId: string): Promise<void> {
    let url = `${this.devicesUrl}/${DeviceId}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  //probably not needed, can remove
  create(name: string): Promise<Device> {
    return this.http
      .post(this.devicesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(device: Device): Promise<Device> {
    const url = `${this.devicesUrl}/${device.DeviceId}`;
    return this.http
      .put(url, JSON.stringify(device), {headers: this.headers})
      .toPromise()
      .then(() => device)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
