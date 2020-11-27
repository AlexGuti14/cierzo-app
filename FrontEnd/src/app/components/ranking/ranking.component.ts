import { Component, OnInit } from '@angular/core';
import { barrios } from '../../../assets/coordenadas/barriosGeoJson.js';
import { BarriosService } from 'src/app/services/barrios-services.service.js';

export interface categoria {
	nombre: string;
	estrellas: number;
}

export interface barrio {
	nombre: string,
	idBarrio: string,
	estrellas: number,
	categorias: categoria[]
}

interface filtro {
	value: string;
	viewValue: string;
}

@Component({
	selector: 'app-ranking',
	templateUrl: './ranking.component.html',
	styleUrls: ['./ranking.component.css']
})
export class RankingComponent {

	listaBarrios: barrio[] = [];
	categorias: categoria[] = [
		{
			nombre: "Conectividad",
			estrellas: 0
		},
		{
			nombre: "Economía",
			estrellas: 0
		},
		{
			nombre: "Cultura y ocio",
			estrellas: 0
		},
	]

	seleccionadoPorDefecto = 'general';
	filtros: filtro[] = [
		{ value: 'general', viewValue: 'General' },
		{ value: 'conectividad', viewValue: 'Conectividad' },
		{ value: 'economia', viewValue: 'Economía' },
		{ value: 'cultura', viewValue: 'Cultura y ocio' }
	];

	constructor(private barriosService: BarriosService) {
		this.refrescarRanking(this.seleccionadoPorDefecto);
	}

	refrescarRanking(filtro: string) {
		this.barriosService.getBarriosOrdenadosSegunRanking(filtro).subscribe(
			res => {
				this.listaBarrios = [];
				for (let barrio of res) {
					this.listaBarrios.push({
						nombre: barrio['name'],
						idBarrio: barrio['districtId'],
						estrellas: barrio['estrellas'],
						categorias: [
							{
								nombre: "Conectividad",
								estrellas: barrio['conectividad']['estrellas']
							},
							{
								nombre: "Economía",
								estrellas: barrio['economia']['estrellas']
							},
							{
								nombre: "Cultura y ocio",
								estrellas: barrio['cultura']['estrellas']
							},
						]
					})
				}
			},
			err => {
				console.error(err);
			})
	}

}
