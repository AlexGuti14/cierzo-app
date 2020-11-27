import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
	selector: 'app-mapa',
	templateUrl: './mapa.component.html',
	styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

	private mapaPrueba: L.Map;

	constructor() {
	}

	ngOnInit(): void {
		
		this.mapaPrueba = L.map('mapaPrueba').fitWorld();

		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			maxZoom: 18,
			tileSize: 512,
			zoomOffset: -1
		}).addTo(this.mapaPrueba);

		this.mapaPrueba.locate({setView: true, maxZoom: 16});
	}

}
