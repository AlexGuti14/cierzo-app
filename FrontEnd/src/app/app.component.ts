import { Component } from '@angular/core';

import {
	Router,
	Event as RouterEvent,
	NavigationStart,
	NavigationEnd,
	NavigationCancel,
	NavigationError
  } from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontCierzo';
  loading = true;

	//esta aqui por si a alguno se os enciende la bombilla, es la manera correcta de hacer el load spinner, ahora intercepta navegacion pero no hace nada
  constructor(private router: Router) {

    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }
  
  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
		console.log("navigation start");
      	this.loading = true;	
    }
    if (event instanceof NavigationEnd) {
		console.log("navigation end");
      	this.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }
}
