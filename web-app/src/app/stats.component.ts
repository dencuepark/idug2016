import { Component } from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { StatsService } from './stats.service';

@Component({
  selector: 'my-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  //Fields for the total active shipments, number of good shipments, number of
  //poor shipments. Read by the template to display
  private activeShipments: number = 0;
  private goodCount: number = 0;
  private poorCount: number = 0;

  //Types to represent each type of shipment
  TYPE_DURABLE: number = 0;
  TYPE_SOMEWHATSENSITIVE: number = 1;
  TYPE_SENSITIVE: number = 2;
  TYPE_HIGHLYSENSITIVE: number = 3;
  TYPE_CRITICAL: number = 4;

  constructor(
    private statsService: StatsService
  ) {}

  /**
  * Start a timer that tics every 16 seconds.
  * Is 16 an aritrary number? Yes. At least its a power of 2!
  */
  ngOnInit(): void {
    let timer = Observable.timer(0,16*1000);
    timer.subscribe(t=> {
        this.tickerFunc(t);
    });
  }

  /**
  * Events that are triggered when a chart is clicked or hovered over.
  * They don't do anything at the moment...
  * TODO: maybe use these to navigate to search results with the relevent
  * device set
  */
  public chartClicked(e:any):void { }
  public chartHovered(e:any):void { }

  /**
  * Boss: "These charts aren't going to update themselves! Get to work!"
  * Employee: "Actually I wrote a timer so they actually DO update themselves"
  * Boss: "I don't care what time it is! If you don't update these charts,
  * you're fired!"
  * (its a timer that updates the charts)
  */
  tickerFunc(tick){
    this.updateDoughnut();
    this.updateBarChart();
  }

  /**
  * Gets the total number of shipments for each of the 16 shipment categories
  * Iterates through the list of properties, and checks if they qualify as
  * durable, somewhat sensitive, sensitive, highly sensitive, or critical.
  * durable has 0 sensors, critical has 4, etc. Gives the doughnut chart a
  * new data array with this calculated info.
  */
  updateDoughnut() {
    //update doughnut
    this.statsService.getTypeCounts().then(count => {
      var durable:number=0;   var somewhatSensitive:number=0;
      var sensitive:number=0; var highlySensitive:number=0;
      var critical:number=0;  var total:number = 0;
      for (var property in count) {
        if (count.hasOwnProperty(property)) {
          if(!isNaN(+count[property])){
            let flag:number = +property.substring(5);
            let category:number = this.bitCount(flag);
            if(category == this.TYPE_DURABLE)
              durable += +count[property];
            else if(category == this.TYPE_SOMEWHATSENSITIVE)
              somewhatSensitive += +count[property];
            else if(category == this.TYPE_SENSITIVE)
              sensitive += +count[property];
            else if(category == this.TYPE_HIGHLYSENSITIVE)
              highlySensitive += +count[property];
            else if(category == this.TYPE_CRITICAL)
              critical += +count[property];
            total += +count[property];
          }
        }
      }
      this.doughnutChartData =
      [durable, somewhatSensitive, sensitive, highlySensitive, critical];
      this.activeShipments = total;
    });
  }

  /**
  * This works the same as updateDoughnutChart, except it gets the number of
  * shipments that are in good condition, and the number of shipments in poor
  * condition; grouped by shipment category. Gives the bar chart a new data
  * array with this calculated info.
  */
  updateBarChart() {
    //update bar chart
    this.statsService.getConditionCounts().then(count => {
      var goodDurable:number=0;   var goodSomewhatSensitive:number=0;
      var goodSensitive:number=0; var goodHighlySensitive:number=0;
      var goodCritical:number=0;  var goodTotal:number=0;
      var poorDurable:number=0;   var poorSomewhatSensitive:number=0;
      var poorSensitive:number=0; var poorHighlySensitive:number=0;
      var poorCritical:number=0;  var poorTotal:number=0;
      for (var property in count.good) {
        if(count.good.hasOwnProperty(property)){
          if(!isNaN(+count.good[property])){
            let flag:number = +property.substring(5);
            let category:number = this.bitCount(flag);
            if(category == this.TYPE_DURABLE)
              goodDurable += +count.good[property];
            else if(category == this.TYPE_SOMEWHATSENSITIVE)
              goodSomewhatSensitive += +count.good[property];
            else if(category == this.TYPE_SENSITIVE)
              goodSensitive += +count.good[property];
            else if(category == this.TYPE_HIGHLYSENSITIVE)
              goodHighlySensitive += +count.good[property];
            else if(category == this.TYPE_CRITICAL)
              goodCritical += +count.good[property];
            goodTotal += +count.good[property];
          }
        }
      }
      for (var property in count.poor) {
        if(count.good.hasOwnProperty(property)){
          if(!isNaN(+count.poor[property])){
            let flag:number = +property.substring(5);
            let category:number = this.bitCount(flag);
            if(category == this.TYPE_DURABLE)
              poorDurable += +count.poor[property];
            else if(category == this.TYPE_SOMEWHATSENSITIVE)
              poorSomewhatSensitive += +count.poor[property];
            else if(category == this.TYPE_SENSITIVE)
              poorSensitive += +count.poor[property];
            else if(category == this.TYPE_HIGHLYSENSITIVE)
              poorHighlySensitive += +count.poor[property];
            else if(category == this.TYPE_CRITICAL)
              poorCritical += +count.poor[property];
            poorTotal += +count.poor[property];
          }
        }
      }
      this.barChartData = [
          {data: [goodDurable, goodSomewhatSensitive, goodSensitive,
            goodHighlySensitive, goodCritical],
          label: 'Good Condition'},
          {data: [poorDurable, poorSomewhatSensitive, poorSensitive,
            poorHighlySensitive, poorCritical],
          label: 'Poor Condition'}
        ];
        this.goodCount = goodTotal;
        this.poorCount = poorTotal;
    });
  }

  /**
  * Simple helper method that gets the # of on bits in a number/bitmask
  */
  bitCount(v: number):number{
    let c:number = 0;
    for(c = 0; v; c++){ v &= v-1; }
    return c;
  }

  /*********************
  Initialize Stats Charts
  *********************/

  // Doughnut
  public doughnutChartOptions:any = {
    responsive: true,
    animation: false,
    legend: {
      display: false
    }
  };
  public doughnutChartLabels:string[] =
    ['Durable', 'Somewhat Sensitive', 'Sensitive', 'Highly Sensitive',
    'Critical'];
  public doughnutChartData:number[] =
    [0, 0, 0, 0, 0];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartColors:any[] =
    [{ backgroundColor: ["#9C27B0", "#3F51B5", "#009688",  "#FFEB3B",
                         "#F44336"] }];

  //Bar
  public barChartOptions:any = {
    animation: false,
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      display: false
    }
  };
  public barChartLabels:any[] =
    ['Durable', ['Somewhat','Sensitive'], 'Sensitive', ['Highly', 'Sensitive'],
    'Critical'];
  public barChartType:string = 'bar';
  private barChartColors: any[] =
    [ { backgroundColor: '#03A9F4' }, { backgroundColor: '#F44336' } ]
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [0, 0, 0, 0, 0],
     label: 'Good Condition'},
    {data: [0, 0, 0, 0, 0],
     label: 'Poor Condition'}
  ];
}
