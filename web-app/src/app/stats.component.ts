import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Observable} from 'rxjs/Rx';

import { StatsService } from './stats.service';

@Component({
  selector: 'my-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  private activeShipments: number = 0;
  private goodCount: number = 0;
  private poorCount: number = 0;

  messages = [];
  typesConnection;
  conditionConnection;

  constructor(
    private route: ActivatedRoute,
    private statsService: StatsService
  ) {}

  // Doughnut
  public doughnutChartOptions:any = {
    //maintainAspectRatio: false,
    responsive: true,
    animation: false,
    legend: {
      display: false
    }
  };
  public doughnutChartLabels:string[] =
    ['Durable', 'Somewhat Sensitive', 'Sensitive', 'Highly Sensitive', 'Critical'];
    // DETAILED SHIPMENT CATEGORY LABELS DO NOT DELETE
    // ['Class0', 'Class1', 'Class2', 'Class3',
    // 'Class4', 'Class5', 'Class6', 'Class7',
    // 'Class8', 'Class9', 'Class10', 'Class11',
    // 'Class12', 'Class13', 'Class14', 'Class15'];
  public doughnutChartData:number[] =
    [0, 0, 0, 0, 0];
    // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartColors:any[] =
    [{ backgroundColor: ["#9C27B0", "#3F51B5", "#009688",  "#FFEB3B",
                         "#F44336"] }];
  // DETAILED SHIPMENT CATEGORY COLORS DO NOT DELTE
  //   [{ backgroundColor: ["#F44336", "#E91E63", "#9C27B0", "#673AB7",
  //                        "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4",
  //                        "#009688", "#4CAF50", "#8BC34A", "#CDDC39",
  //                        "#FFEB3B", "#FFC107", "#FF9800", "#FF5722"] }];
  //Bar
  public barChartOptions:any = {
    animation: false,
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      display: false
    }
  };
  // public barChartLabels:string[] = ['Medical', 'Chilled', 'Fragile'];
  public barChartLabels:any[] =
    ['Durable', ['Somewhat','Sensitive'], 'Sensitive', ['Highly', 'Sensitive'], 'Critical'];
    // DETAILED SHIPMENT CATEGORY LABELS DO NOT DELETE
    // ['Class0', 'Class1', 'Class2', 'Class3',
    // 'Class4', 'Class5', 'Class6', 'Class7',
    // 'Class8', 'Class9', 'Class1', 'Class11',
    // 'Class12', 'Class13', 'Class14', 'Class15'];
  public barChartType:string = 'bar';
  private barChartColors: any[] =
    [ { backgroundColor: '#03A9F4' }, { backgroundColor: '#F44336' } ]
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [0, 0, 0, 0, 0],
    // {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     label: 'Good Condition'},
    {data: [0, 0, 0, 0, 0],
    // {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     label: 'Poor Condition'}
  ];

  ngOnInit(): void {

    let timer = Observable.timer(1000,1000);
    timer.subscribe(t=> {
        this.tickerFunc(t);
    });
  }

  tickerFunc(tick){
    //update doughnut
    this.route.params.forEach((params: Params) => {
      this.statsService.getTypeCounts().then(count => {
        var durable:number;
        var somewhatSensitive:number;
        var sensitive:number;
        var highlySensitive:number;
        var critical:number;
        durable = +count.Class0;
        somewhatSensitive =
          +count.Class1 + +count.Class2 + +count.Class4 + +count.Class8;
        sensitive =
          +count.Class3 + +count.Class5 + +count.Class6 + +count.Class9 +
          +count.Class10 + +count.Class12;
        highlySensitive =
          +count.Class7 + +count.Class11 + +count.Class13 + +count.Class14
        critical = +count.Class15;
        this.doughnutChartData =
        [durable, somewhatSensitive, sensitive, highlySensitive, critical];
        // DETAILED SHIPMENT CATEGORY DATA DO NOT DELETE
        // [count.Class0, count.Class1, count.Class2, count.Class3,
        //  count.Class4, count.Class5, count.Class6, count.Class7,
        //  count.Class8, count.Class9, count.Class10, count.Class11,
        //  count.Class12, count.Class13, count.Class14, count.Class15],
        this.activeShipments =
        +count.Class0 + +count.Class1 + +count.Class2 + +count.Class3 +
        +count.Class4 + +count.Class5 + +count.Class6 + +count.Class7 +
        +count.Class8 + +count.Class9 + +count.Class10 + +count.Class11 +
        +count.Class12 + +count.Class13 + +count.Class14 + +count.Class15;
      });
    });

    //update bar chart
    this.route.params.forEach((params: Params) => {
      this.statsService.getConditionCounts().then(count => {
        var goodDurable:number;
        var goodSomewhatSensitive:number;
        var goodSensitive:number;
        var goodHighlySensitive:number;
        var goodCritical:number;
        var poorDurable:number;
        var poorSomewhatSensitive:number;
        var poorSensitive:number;
        var poorHighlySensitive:number;
        var poorCritical:number;
        goodDurable = +count.good.Class0;
        goodSomewhatSensitive =
          +count.good.Class1 + +count.good.Class2 + +count.good.Class4 +
          +count.good.Class8;
        goodSensitive =
          +count.good.Class3 + +count.good.Class5 + +count.good.Class6 +
          +count.good.Class9 + +count.good.Class10 + +count.good.Class12;
        goodHighlySensitive =
          +count.good.Class7 + +count.good.Class11 + +count.good.Class13 +
          +count.good.Class14
        goodCritical = +count.good.Class15;

        poorDurable = +count.poor.Class0;
        poorSomewhatSensitive =
          +count.poor.Class1 + +count.poor.Class2 + +count.poor.Class4 +
          +count.poor.Class8;
        poorSensitive =
          +count.poor.Class3 + +count.poor.Class5 + +count.poor.Class6 +
          +count.poor.Class9 + +count.poor.Class10 + +count.poor.Class12;
        poorHighlySensitive =
          +count.poor.Class7 + +count.poor.Class11 + +count.poor.Class13 +
          +count.poor.Class14
        poorCritical = +count.poor.Class15;

        this.barChartData = [
            {data: [goodDurable, goodSomewhatSensitive, goodSensitive,
              goodHighlySensitive, goodCritical],
            label: 'Good Condition'},
            {data: [poorDurable, poorSomewhatSensitive, poorSensitive,
              poorHighlySensitive, poorCritical],
            label: 'Poor Condition'}
          // DETAILED SHIPMENT CATEGORY DATA DO NOT REMOVE
          // {data: [count.good.Class0, count.good.Class1, count.good.Class2, count.good.Class3,
          //  count.good.Class4, count.good.Class5, count.good.Class6, count.good.Class7,
          //  count.good.Class8, count.good.Class9, count.good.Class10, count.good.Class11,
          //  count.good.Class12, count.good.Class13, count.good.Class14, count.good.Class15],
          //   label: 'Good Condition'},
          // {data: [count.poor.Class0, count.poor.Class1, count.poor.Class2, count.poor.Class3,
          //  count.poor.Class4, count.poor.Class5, count.poor.Class6, count.poor.Class7,
          //  count.poor.Class8, count.poor.Class9, count.poor.Class10, count.poor.Class11,
          //  count.poor.Class12, count.poor.Class13, count.poor.Class14, count.poor.Class15],
          //   label: 'Poor Condition'}
          ];
          this.goodCount =
            +count.good.Class0 + +count.good.Class1 + +count.good.Class2 + +count.good.Class3 +
            +count.good.Class4 + +count.good.Class5 + +count.good.Class6 + +count.good.Class7 +
            +count.good.Class8 + +count.good.Class9 + +count.good.Class10 + +count.good.Class11 +
            +count.good.Class12 + +count.good.Class13 + +count.good.Class14 + +count.good.Class15;
          this.poorCount =
            +count.poor.Class0 + +count.poor.Class1 + +count.poor.Class2 + +count.poor.Class3 +
            +count.poor.Class4 + +count.poor.Class5 + +count.poor.Class6 + +count.poor.Class7 +
            +count.poor.Class8 + +count.poor.Class9 + +count.poor.Class10 + +count.poor.Class11 +
            +count.poor.Class12 + +count.poor.Class13 + +count.poor.Class14 + +count.poor.Class15;
        });
    });
  }

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }
}
