import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { barrios } from '../../../assets/coordenadas/barriosGeoJson.js';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import * as esri from 'esri-leaflet-geocoder';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
	iconRetinaUrl,
	iconUrl,
	shadowUrl,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	tooltipAnchor: [16, -28],
	shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css', '../../../assets/leaflet/leaflet.css']
})
export class HomeComponent implements OnInit {
	constructor(
		private elementRef: ElementRef,
		private router: Router
	) {
		/* const idToken: string = localStorage.getItem("token");
		if (!idToken) {
			this.router.navigate(['inicio-sesion']);
		} */
	}

	private map;

	ngOnInit() {
		this.map = L.map("map", {
			minZoom: 9
		}).setView([41.649914, -0.877733], 13);
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.map);

		var corner1 = L.latLng(41.929688, -1.214416),
			corner2 = L.latLng(41.414537, -0.642692),
			bounds = L.latLngBounds(corner1, corner2);
		this.map.setMaxBounds(bounds);

		// create the geocoding control and add it to the map
		var searchControl = esri.geosearch(
			{
				position: 'topright',
				placeholder: 'Busca una calle',
				searchBounds: bounds
			}
		).addTo(this.map);

		var results = L.layerGroup().addTo(this.map);
		searchControl.on('results', function (data) {
			results.clearLayers();
			for (var i = data.results.length - 1; i >= 0; i--) {
				results.addLayer(L.marker(data.results[i].latlng).bindPopup(data.results[i].text).openPopup());
			}
		});

		this.buildBarrios();
	}

	buildBarrios() {
		for (let barrio of barrios['features']) {
			const popupInfo =
				`<style>
			h3.center{
				text-align: center;
			}
			button {
				background-color: steelblue;
				color: white;
				border-color: white;
				border-width: 1px;
			}
		</style>` +
				"<h3 class='center'>" + barrio.properties.NOMBRE + "</h3>" +
				'<button class="ver" id="popupbarrio" ng-click=this.next()>Ver más</button>';

			L.geoJSON(barrio, {
				style: this.style(), onEachFeature: (feature, layer) => (
					layer.on({
						mouseover: (e) => (this.highlightFeature(e)),
						mouseout: (e) => (this.resetHighlight(e))
					})
				)
			})
				.addTo(this.map)
				.bindPopup(popupInfo)
				.on("popupopen", (e) => {
					this.zoomToFeature(e)
					this.elementRef.nativeElement
						.querySelector(".ver")
						.addEventListener("click", e => {
							this.verInfoBarrio(barrio);
						});
				});
		}
	}

	style() {
		return {
			weight: 2,
			opacity: 5,
			color: 'black',
			dashArray: '1',
			fillOpacity: 0
		};
	}

	verInfoBarrio(barrio) {
		this.router.navigate([`info-barrio/${barrio.properties.OBJECTID}`]);
	}

	zoomToFeature(e) {
		this.map.fitBounds(e.target.getBounds());
	}

	highlightFeature(e) {
		const layer = e.target;
		layer.setStyle({
			weight: 4,
			opacity: 1.0,
			color: '#000000',
			fillOpacity: 0.6,
			fillColor: '#F0FFFF'
		});

	}

	resetHighlight(e) {
		const layer = e.target;
		layer.setStyle({
			weight: 2,
			opacity: 5,
			color: 'black',
			dashArray: '1',
			fillOpacity: 0.1
		});
	}
}
