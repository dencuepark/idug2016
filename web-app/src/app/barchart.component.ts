import { Component } from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'bar-chart',
  templateUrl: './barchart.component.html'
})

//This is simply a test Barchart, will be replaced with data taken from server
export class BarChartComponent {
  public barChartOptions:any = {
    animation: false,
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Medical', 'Chilled', 'Fragile'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [65, 59, 80], label: 'Good Condition'},
    {data: [28, 48, 40], label: 'Poor Condition'}
  ];

  ngOnInit() {
    let timer = Observable.timer(2000,1000);
    timer.subscribe(t=> {
        this.tickerFunc(t);
    });
  }

  tickerFunc(tick){
    //console.log(this);
    this.randomize();
  }

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }

  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      (Math.random() * 100),
      (Math.random() * 100)];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}
