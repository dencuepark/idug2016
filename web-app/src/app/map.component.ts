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
  lat: number = 41.082252;
  lng: number = -74.174663;
  zoom: number = 12;
  // ngOnInit(){
  //   if(navigator.geolocation){
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //       console.log(position.coords);
  //       this.lat = position.coords.latitude;
  //       this.lng = position.coords.longitude;
  //     });
  //   };
  // }
}
