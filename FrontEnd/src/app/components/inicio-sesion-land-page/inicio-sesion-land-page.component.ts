import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-inicio-sesion-land-page',
	templateUrl: './inicio-sesion-land-page.component.html',
	styleUrls: ['./inicio-sesion-land-page.component.css']
})
export class InicioSesionLandPageComponent implements OnInit {

	constructor(private activatedroute: ActivatedRoute,
		private router: Router) {
		this.activatedroute.paramMap.subscribe(params => {
			localStorage.setItem('token', params.get('token'));
			localStorage.setItem('admin', params.get('admin'));
			localStorage.setItem('banned', params.get('banned'));
			localStorage.setItem('id', params.get('id'));
			this.router.navigate([`home`]);
		});
	}

	ngOnInit(): void {
	}

}
