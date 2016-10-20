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
  title: string = 'My first angular2-google-maps project';
  lat: number = 51.678418;
  lng: number = 7.809007;
}
