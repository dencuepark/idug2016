import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import {Observable} from 'rxjs/Rx';

import { Device }        from './device';
import { DeviceService } from './device.service';

@Component({
  selector: 'my-device-detail',
  templateUrl: 'device-detail.component.html',
  styleUrls: [ 'device-detail.component.css' ]
})
export class DeviceDetailComponent implements OnInit {
  device: Device;

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {

    let timer = Observable.timer(1000,1000);
    timer.subscribe(t=> {
        this.tickerFunc(t);
    });
  }

  tickerFunc(tick){
    this.route.params.forEach((params: Params) => {
      let DeviceId = params['DeviceId']; //+params['DeviceId']; //the plus operator converts to a number
      this.deviceService.getDevice(DeviceId)
        .then(device => this.device = device);
    });
  }

  //Ability to make and save changes most likely will not be needed, remove
  //this at some point.
  save(): void {
    this.deviceService.update(this.device)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
