import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatsComponent } from './stats.component';
import { DevicesComponent } from './devices.component';
import { DeviceDetailComponent } from './device-detail.component';

//Setup routes for navigating to the /stats, /devices, and generated /detail
//pages.
/*TODO: Write a "page not found" route for all other paths*/
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/stats',
    pathMatch: 'full'
  },
  {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: 'detail/:DeviceId',
    component: DeviceDetailComponent
  },
  {
    path: 'search/:term',
    component: DevicesComponent
  },
  {
    path: 'devices',
    component: DevicesComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
