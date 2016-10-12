import { Component } from '@angular/core';
import { Router }            from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
    styleUrls: ['./app.component.css']
})
export class TopbarComponent {
  constructor(
    private router: Router) {
  }

  //Methods to navigate to topbar links
  gotoStats(): void {
    let link = ['/stats'];
    this.router.navigate(link);
  }
  gotoDevices(): void {
    let link = ['/devices'];
    this.router.navigate(link);
  }
}
