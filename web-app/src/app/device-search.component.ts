import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { DeviceSearchService } from './device-search.service';
import { Device } from './device';

@Component({
  selector: 'device-search',
  templateUrl: 'device-search.component.html',
  styleUrls: [ 'device-search.component.css' ],
  providers: [DeviceSearchService]
})
export class DeviceSearchComponent implements OnInit {
  devices: Observable<Device[]>;
  public results;

  private searchTerms = new Subject<string>();
  private urlTerm: string;
  constructor(
    private deviceSearchService: DeviceSearchService,
    private route: ActivatedRoute,
    private router: Router) {}
  // Push a search term into the observable stream.
  search(term: string): void {
    let link = ['/search',term];
    this.router.navigate(link);
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.urlTerm = params['term'];
      if(this.urlTerm) this.getDevices(this.urlTerm);
      //if(this.urlTerm) this.search(this.urlTerm);
    });
    /*
    this.devices = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.deviceSearchService.search(term)
        // or the observable of empty heroes if no search term
        : Observable.of<Device[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Device[]>([]);
      });*/
  }

  getDevices(searchTerm: string) {
    this.deviceSearchService.search(searchTerm).subscribe(
      data => { this.results = data},
      err => console.error(err)
    );
  }

  gotoDetail(Device: Device): void {
    let link = ['/detail', Device.DeviceId];
    this.router.navigate(link);
  }
}
