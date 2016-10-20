//import all necessary modules for the app to use
import 'chart.js/src/chart.js'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MdButtonModule } from '@angular2-material/button';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdCardModule } from '@angular2-material/card';
import { MdInputModule } from '@angular2-material/input';
import { MdIconModule } from '@angular2-material/icon';

import { ChartsModule } from 'ng2-charts/ng2-charts'
import { AgmCoreModule } from 'angular2-google-maps/core';

//import { MdlModule } from 'angular2-mdl';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { StatsComponent } from './stats.component';
import { DevicesComponent } from './devices.component';
import { BarChartComponent } from './barchart.component';
import { TopbarComponent } from './topbar.component';
import { DeviceSearchComponent } from './device-search.component';
import { DeviceDetailComponent } from './device-detail.component';
import { MapComponent } from './map.component';

import { DeviceService } from './device.service';
import { StatsService } from './stats.service';
import { InMemoryDataService } from './in-memory-data.service';

import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    DeviceDetailComponent,
    DevicesComponent,
    DeviceSearchComponent,
    MapComponent,
    StatsComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
    MdButtonModule.forRoot(),
    MdCardModule.forRoot(),
    MdIconModule.forRoot(),
    MdInputModule.forRoot(),
    MdToolbarModule.forRoot(),
    //MdlModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCfms1rK_B4oj1iAqb-OD9NtggpFer-gaY'
    })
  ],
  providers: [DeviceService, StatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
