import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Device } from './device';
import { DeviceRecords } from './device-records';
import { DeviceHistory } from './device-history';

@Injectable()
export class DeviceService {

  /**
  * @http: used to make get rquests to the Nodejs server
  */
  constructor(private http: Http) { }

  /**
  * Given a DeviceId, hit the /app/device endpoint to get the data about that
  * device and satisfy the promise by using the device model to return that
  * data as a Device object
  */
  getDevice(DeviceId: string): Promise<Device> {
    return this.http.get(`/app/device/${DeviceId}`)
               .timeout(1000*60*2, new Error('timeout exceeded'))
               .toPromise()
               .then(response => response.json().data as Device)
               .catch(this.handleError);
  }

  /**
  * Get the highest values for the specified device
  * retrieved by hitting the /app/records endpoint
  * satisfies the promise by using the device records model to return the data
  * as a DeviceRecords object
  */
  getDeviceRecords(DeviceId: string): Promise<DeviceRecords> {
    return this.http.get(`/app/records/${DeviceId}`)
               .timeout(1000*60*2, new Error('timeout exceeded'))
               .toPromise()
               .then(response => response.json().data as DeviceRecords)
               .catch(this.handleError);
  }

  /**
  * Get the complete history for a specified device
  * retrieved by hitting the /app/history endpoint
  * satisfies the promise by using the device history model to return the data
  * as a DeviceHistory object
  */
  getDeviceHistory(DeviceId: string): Promise<DeviceHistory> {
    return this.http.get(`/app/history/${DeviceId}`)
               .timeout(1000*60*2, new Error('timeout exceeded'))
               .toPromise()
               .then(response => response.json().data as DeviceHistory)
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
