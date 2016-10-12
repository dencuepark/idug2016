import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Observable} from 'rxjs/Rx';

import { GoogleChartComponent} from './chart.component';
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
  ) {
    // this.statsService.getInstanceStatus().subscribe((result) => {
    //   console.log('result: ', result.toString());
    // });
    this.typesConnection = this.statsService.getTypesMessages().subscribe(message => {
      //update doughnut
      let count = JSON.parse(String(message)).data;
      this.doughnutChartData = [count.medical, count.chilled, count.fragile];
      this.activeShipments = count.medical + count.chilled + count.fragile;
    });
    this.conditionConnection = this.statsService.getConditionMessages().subscribe(message => {
      //update barchart
      let count = JSON.parse(String(message)).data;
      this.barChartData = [
              {data: [count.good.medical, count.good.chilled, count.good.fragile],
                label: 'Good Condition'},
              {data: [count.poor.medical, count.poor.chilled, count.poor.fragile],
                label: 'Poor Condition'}
              ];
      this.goodCount =
        count.good.medical + count.good.chilled + count.good.fragile;
      this.poorCount =
        count.poor.medical + count.poor.chilled + count.poor.fragile;
    });
  }



  // Doughnut
  public doughnutChartOptions:any = {
    //maintainAspectRatio: false,
    responsive: true,
    animation: false,
    legend: {
      display: false
    }
  };
  public doughnutChartLabels:string[] = ['Medical', 'Chilled', 'Fragile'];
  public doughnutChartData:number[] = [0, 0, 0];
  public doughnutChartType:string = 'doughnut';

  //Bar
  public barChartOptions:any = {
    animation: false,
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      display: false
    }
  };
  public barChartLabels:string[] = ['Medical', 'Chilled', 'Fragile'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [0, 0, 0], label: 'Good Condition'},
    {data: [0, 0, 0], label: 'Poor Condition'}
  ];

  // ngOnInit(): void {
  //
  //   let timer = Observable.timer(1000,1000);
  //   timer.subscribe(t=> {
  //       this.tickerFunc(t);
  //   });
  // }
  ngOnDestroy() {
    this.typesConnection.unsubscribe();
    this.conditionConnection.unsubscribe();
  }

  // tickerFunc(tick){
  //   //update doughnut
  //   this.route.params.forEach((params: Params) => {
  //     this.statsService.getTypeCounts().then(count => {
  //       this.doughnutChartData = [count.medical, count.chilled, count.fragile],
  //       this.activeShipments = count.medical + count.chilled + count.fragile
  //     });
  //   });
  //
  //   this.route.params.forEach((params: Params) => {
  //     this.statsService.getConditionCounts().then(count => {
  //       this.barChartData = [
  //         {data: [count.good.medical, count.good.chilled, count.good.fragile],
  //           label: 'Good Condition'},
  //         {data: [count.poor.medical, count.poor.chilled, count.poor.fragile],
  //           label: 'Poor Condition'}
  //         ],
  //         this.goodCount =
  //           count.good.medical + count.good.chilled + count.good.fragile,
  //         this.poorCount =
  //           count.poor.medical + count.poor.chilled + count.poor.fragile
  //       });
  //   });
  // }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }
}
