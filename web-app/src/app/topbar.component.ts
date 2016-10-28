import { Component } from '@angular/core';
import { Router }            from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
    styleUrls: ['./app.component.css']
})
export class TopbarComponent {

  /**
  * @router: Used to navigate to the stats and shipments pages
  */
  constructor(private router: Router) { }

  /**
  * Navigate the router to the stats page
  */
  gotoStats(): void {
    let link = ['/stats'];
    this.router.navigate(link);
  }

  /**
  * Navigate the router to the shipments page
  */
  gotoDevices(): void {
    let link = ['/shipments'];
    this.router.navigate(link);
  }
}
