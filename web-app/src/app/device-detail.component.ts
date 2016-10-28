import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import {Observable} from 'rxjs/Rx';

import { Device }        from './device';
import { DeviceRecords } from './device-records';
import { DeviceHistory } from './device-history';
import { DeviceService } from './device.service';

@Component({
  selector: 'my-device-detail',
  templateUrl: 'device-detail.component.html',
  styleUrls: [ 'device-detail.component.css' ]
})
export class DeviceDetailComponent implements OnInit {
  device: Device;
  deviceRecords: DeviceRecords;
  deviceHistory: DeviceHistory;

  FLAG_TEMPERATURE:number = 1; //0001
  FLAG_ACCELERATION:number = 2; //0010
  FLAG_MAGNET:number = 4; //0100
  FLAG_LIGHT:number = 8; //1000

  tempThreshold:number = 60;
  accThreshold:number = 70;
  magThreshold:number = 80;
  lightThreshold:number = 90;

  goodCondition:boolean = true;

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    //Every second, update the device info
    let timer = Observable.timer(1000,1000);
    timer.subscribe(t=> {
        this.tickerFunc(t);
    });
  }

  tickerFunc(tick){
    this.route.params.forEach((params: Params) => {
      let DeviceId = params['DeviceId']; //get the device id from the url
      this.deviceService.getDevice(DeviceId) //http get the device
        .then(device => this.device = device);
      this.deviceService.getDeviceRecords(DeviceId) //http get its top values
        .then(deviceRecords => this.deviceRecords = deviceRecords);
      this.deviceService.getDeviceHistory(DeviceId)
        .then(deviceHistory => this.deviceHistory = deviceHistory);

      if(this.deviceRecords) this.updateStatus();
      if(this.deviceHistory){
        this.deviceHistory.timestamps =
          this.formatTimestamps(this.deviceHistory.timestamps);
        //create new data arrays for the line charts
        var lineChartDataTemp: any[] = [
          {data: this.deviceHistory.temperatures, label: 'Temperature'}
        ];
        var accChartDataTemp: any[] = [
          {data: this.deviceHistory.accelerations, label: 'Acceleration'}
        ];
        var magChartDataTemp: any[] = [
          {data: this.deviceHistory.magnets, label: 'Magnetization'}
        ];
        var lightChartDataTemp: any[] = [
          {data: this.deviceHistory.lights, label: 'Light Level'}
        ];

        //Just swapping out the line chart's label array won't update it.
        //this edits the existing arrays element by element to trick it
        //into updating the timestamp labels.
        //if more time has been added, it gets appended
        for(var i = 0; i < this.deviceHistory.timestamps.length; i++){
          if(i >= this.lineChartLabels.length){
            this.lineChartLabels.push(this.deviceHistory.timestamps[i]);
            this.accChartLabels.push(this.deviceHistory.timestamps[i]);
            this.magChartLabels.push(this.deviceHistory.timestamps[i]);
            this.lightChartLabels.push(this.deviceHistory.timestamps[i]);
          }
          else{
            this.lineChartLabels[i] = this.deviceHistory.timestamps[i];
            this.accChartLabels[i] = this.deviceHistory.timestamps[i];
            this.magChartLabels[i] = this.deviceHistory.timestamps[i];
            this.lightChartLabels[i] = this.deviceHistory.timestamps[i];
          }
        }

        //assign the new data to the line charts' original data arrays
        this.lineChartData = lineChartDataTemp;
        this.accChartData = accChartDataTemp;
        this.magChartData = magChartDataTemp;
        this.lightChartData = lightChartDataTemp;
      }
    });
  }

  updateStatus(){
    let flag = +(this.deviceRecords.ShipmentCategory.substring(5));
    if(((flag & this.FLAG_TEMPERATURE)
        && (+this.deviceRecords.temperature > this.tempThreshold)) ||
      ((flag & this.FLAG_ACCELERATION)
        && (+this.deviceRecords.acceleration > this.accThreshold)) ||
      ((flag & this.FLAG_MAGNET)
        && (+this.deviceRecords.magnet > this.magThreshold)) ||
      ((flag & this.FLAG_LIGHT)
        && (+this.deviceRecords.light > this.lightThreshold))) {
          this.goodCondition = false;
        }
        else {
          this.goodCondition = true;
        }
  }

  formatTimestamps(arr: string[]):string[]{
    for(var i = 0; i < arr.length; i++){
      var date = new Date(+arr[i]*1000);
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      if(!isNaN(year) && !isNaN(month) && !isNaN(day) && !isNaN(hours)
      && !isNaN(minutes) && !isNaN(seconds))
        arr[i] = month+"/"+day+"/"+year+"-"+hours+":"+minutes+":"+seconds;
      // let seconds:number = +arr[i] % 60;
      // let minutes:number = Math.floor(+arr[i]/60) % 60;
      // let hours:number = Math.floor(+arr[i]/(60*60)) %24;
      // let days:number = Math.floor(+arr[i]/(60*60*24));
      // arr[i] = days+":"+hours+"-"+minutes+"-"+seconds;
    }
    return arr;
  }

  //initial values for thermometer history line chart
  public lineChartData: any[] = [
    {data: [0], label: 'Temperature'}
  ];
  public lineChartLabels: any[] = [];
  public lineChartOptions:any = {
    animation: false,
    responsive: true,
  };
  public lineChartColors:Array<any> = [
    { backgroundColor:           '#FFCDD2', borderColor:           '#F44336',
      pointBackgroundColor:      '#F44336', pointBorderColor:      '#fff',
      pointHoverBackgroundColor: '#fff',    pointHoverBorderColor: '#F44336' }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  //initial values for accelerometer history line chart
  public accChartData: any[] = [
    {data: [0], label: 'Acceleration'}
  ];
  public accChartLabels: any[] = [];
  public accChartOptions:any = {
    animation: false,
    responsive: true,
  };
  public accChartColors:Array<any> = [
    { backgroundColor:           '#E1BEE7', borderColor:           '#9C27B0',
      pointBackgroundColor:      '#9C27B0', pointBorderColor:      '#fff',
      pointHoverBackgroundColor: '#fff',    pointHoverBorderColor: '#9C27B0' }
  ];
  public accChartLegend:boolean = true;
  public accChartType:string = 'line';

  //initial values for magnetometer history line chart
  public magChartData: any[] = [
    {data: [0], label: 'Magnetization'}
  ];
  public magChartLabels: any[] = [];
  public magChartOptions:any = {
    animation: false,
    responsive: true,
  };
  public magChartColors:Array<any> = [
    { backgroundColor:           '#BBDEFB', borderColor:           '#2196F3',
      pointBackgroundColor:      '#2196F3', pointBorderColor:      '#fff',
      pointHoverBackgroundColor: '#fff',    pointHoverBorderColor: '#2196F3' }
  ];
  public magChartLegend:boolean = true;
  public magChartType:string = 'line';

  //initial values for luxometer history line chart
  public lightChartData: any[] = [
    {data: [0], label: 'Light Level'}
  ];
  public lightChartLabels: any[] = [];
  public lightChartOptions:any = {
    animation: false,
    responsive: true,
  };
  public lightChartColors:Array<any> = [
    { backgroundColor:           '#FFF9C4', borderColor:           '#FFEB3B',
      pointBackgroundColor:      '#FFEB3B', pointBorderColor:      '#fff',
      pointHoverBackgroundColor: '#fff',    pointHoverBorderColor: '#FFEB3B' }
  ];
  public lightChartLegend:boolean = true;
  public lightChartType:string = 'line';

  /**
  * navigate to the browser's previous location
  */
  goBack(): void {
    this.location.back();
  }
}
