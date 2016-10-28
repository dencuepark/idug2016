import { Component } from '@angular/core';

@Component({
  selector: 'map-component',
  templateUrl: 'map.component.html',
  styles: [`
    .sebm-google-map-container {
      height: 200px;
    }`]/*,
  styleUrls: ['app.component.css'],*/
})
export class MapComponent {
  //Set the initial values for the google map component
  lat: number = 41.082252;
  lng: number = -74.174663;
  zoom: number = 12;
}
