//Import first party angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//import angular2-material modules
import { MdButtonModule } from '@angular2-material/button';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdCardModule } from '@angular2-material/card';
import { MdInputModule } from '@angular2-material/input';
import { MdIconModule } from '@angular2-material/icon';

//import other third party modules
import 'chart.js/src/chart.js'
import { ChartsModule } from 'ng2-charts/ng2-charts'
import { AgmCoreModule } from 'angular2-google-maps/core';

//import routing
import { routing } from './app.routing';

//import all components for the app
import { AppComponent } from './app.component';
import { StatsComponent } from './stats.component';
import { TopbarComponent } from './topbar.component';
import { DeviceSearchComponent } from './device-search.component';
import { DeviceDetailComponent } from './device-detail.component';
import { MapComponent } from './map.component';

//import all service sor the app
import { DeviceService } from './device.service';
import { StatsService } from './stats.service';

@NgModule({
  declarations: [
    AppComponent,
    DeviceDetailComponent,
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
    MdButtonModule.forRoot(),
    MdCardModule.forRoot(),
    MdIconModule.forRoot(),
    MdInputModule.forRoot(),
    MdToolbarModule.forRoot(),
    routing,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCfms1rK_B4oj1iAqb-OD9NtggpFer-gaY'
    })
  ],
  providers: [DeviceService, StatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
