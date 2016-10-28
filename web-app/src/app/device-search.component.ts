import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { DeviceSearchService } from './device-search.service';
import { Device } from './device';

@Component({
  selector: 'device-search',
  templateUrl: 'device-search.component.html',
  styleUrls: [ 'device-search.component.css' ],
  providers: [DeviceSearchService]
})
export class DeviceSearchComponent implements OnInit {
  public results;
  private urlTerm: string;

  /**
  * @deviceSearchService: used to hit Nodejs endpoints for searching
  * @route: used to extract search info
  * @router: used to navigate to device detail page
  */
  constructor(
    private deviceSearchService: DeviceSearchService,
    private route: ActivatedRoute,
    private router: Router) {}

  /**
  * On init, check the url for a search term. If there is one, get the results
  */
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.urlTerm = params['term'];
      if(this.urlTerm) this.getDevices(this.urlTerm);
    });
  }

  /**
  * Update the route with a new search term
  */
  search(term: string): void {
    let link = ['/search',term];
    this.router.navigate(link);
  }

  /**
  * Given a search term, get all Shipments with an ID that at least partiall
  * matches the search term
  */
  getDevices(searchTerm: string) {
    this.deviceSearchService.search(searchTerm).subscribe(
      data => { this.results = data},
      err => console.error(err)
    );
  }

  /**
  * Take a device ID and go to a detail page about that shipment
  */
  gotoDetail(Device: Device): void {
    let link = ['/detail', Device.DeviceId];
    this.router.navigate(link);
  }
}
