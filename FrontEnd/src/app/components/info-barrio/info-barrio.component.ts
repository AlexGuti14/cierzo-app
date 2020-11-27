import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarriosService } from 'src/app/services/barrios-services.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import {
	ApexAxisChartSeries,
	ApexChart,
	ChartComponent,
	ApexDataLabels,
	ApexXAxis,
	ApexPlotOptions,
	ApexYAxis
} from "ng-apexcharts";
  
export type AChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	dataLabels: ApexDataLabels;
	plotOptions: ApexPlotOptions;
	xaxis: ApexXAxis;
	colors: string[];
};

interface apartado {
	nombre: string;
	valor: string;
}

interface categoria {
	nombre: string;
	estrellas: number;
	apartados: apartado[];
}

interface demografia {
	edadmedia: number;
	poblacionenvejecida: number;
}

interface filtro {
	value: string;
	viewValue: string;
}

@Component({
	selector: 'app-info-barrio',
	templateUrl: './info-barrio.component.html',
	styleUrls: ['./info-barrio.component.css']
})
export class InfoBarrioComponent {
	@ViewChild("chart") chart: ChartComponent;
  	public AchartOptions: Partial<AChartOptions>;

	idBarrio: number;
	infoBarrio: JSON;

	numEstrellas: number;

	comentarios: Array<JSON>;

	esAdmin: boolean = false;
	estaBaneado: boolean = false;

	catDemografia: demografia;

	categorias: categoria[];

	numValoracionesUsuarios: number = 0;
	valoracionUsuarios: number[] = [-1,-1,-1,-1,-1]

	pieChartOptions: ChartOptions = {
		responsive: true,
	};
	pieChartLabels: Label[] = ['0-3', '4-11', '12-15', '16-18'];
	pieChartData: SingleDataSet = [];
	pieChartType: ChartType = 'pie';
	pieChartLegend = true;
	pieChartPlugins = [];

	//stars
	stars: number[] = [1, 2, 3, 4, 5];
	selectedValue: number = 0;
	myvaluation: number;

	ordenarComentarios: string = 'Fecha';

	constructor(private activatedroute: ActivatedRoute,
		private barriosService: BarriosService) {
		this.activatedroute.paramMap.subscribe(params => {
			this.idBarrio = parseInt(params.get('idBarrio'));
		});

		this.barriosService.getInfoBarrio(this.idBarrio)
			.subscribe(res => {
				this.infoBarrio = res;
			},
				err => {
					console.log(err);
				});

		this.barriosService.getComentarios(this.idBarrio, 0)
			.subscribe(res => {
				this.comentarios = res;
			},
				err => {
					console.error(err);
				});

		this.barriosService.getInfoBarrioAyto(this.idBarrio)
			.subscribe(res => {
				this.guardarCategorias(res);
				this.guardarDemografia(res['demografia']);
			})

		this.barriosService.getValoracionesUsuarios(this.idBarrio).subscribe(res => {
			this.guardarValoraciones(res);
		})

		this.barriosService.getMyValuation(this.idBarrio).subscribe(res => {
			console.log(res['score']);
			this.selectedValue = res['score'];
			this.myvaluation = res['score'];
		})

		if (localStorage.getItem('admin') == "true") {
			this.esAdmin = true;
		}
		if (localStorage.getItem('banned') == "true") {
			this.estaBaneado = true;
		}
		monkeyPatchChartJsTooltip();
		monkeyPatchChartJsLegend();
	}

	countStar(star) {
		this.selectedValue = star;
		console.log('Value of star', star);
		this.sendValuation();
		this.myvaluation = star;
	}

	sendValuation() {
		console.log('Value of star', this.selectedValue);
		if (this.myvaluation == -1) {
			this.barriosService.addValuation(this.selectedValue, this.idBarrio)
				.subscribe(res => {
					console.log(res);
				},
					err => {
						console.error(err);
					});
		}
		else {
			this.barriosService.updateValuation(this.selectedValue, this.idBarrio)
				.subscribe(res => {
					console.log(res);
				},
					err => {
						console.error(err);
					});
			this.refrescarChart();
		}

	}

	refrescarComentarios() {
		var ordenar: number;
		if (this.ordenarComentarios == 'Fecha') {
			ordenar = 0;
		}
		else {
			ordenar = 1;
		}
		this.barriosService.getComentarios(this.idBarrio, ordenar)
			.subscribe(res => {
				this.comentarios = res;
			},
				err => {
					console.error(err);
				});
	}

	estrellasRellenas(i) {
		return new Array(Math.round(i));
	}

	estrellasVacias(i) {
		return new Array(5 - Math.round(i));
	}

	mediaEstrellas(c) {
		var acumulado = 0;
		var num = 0;
		for (let apartado of c.apartados) {
			acumulado += apartado.estrellas;
			num++;
		}
		return Math.floor(acumulado / num);
	}

	//array likes de un comentario
	usuarioLikeaComentario(arrayLikes) {
		var iduser = localStorage.getItem('id');
		if (arrayLikes.indexOf(iduser) > -1) {
			return true;
		}
		else {
			return false;
		}
	}

	guardarCategorias(res) {
		this.numEstrellas = res['estrellas'];
		this.categorias = [
			{
				nombre: "Conectividad",
				estrellas: res['conectividad']['estrellas'],
				apartados: [
					{
						nombre: "Número de aparcamientos para bicicletas",
						valor: res['conectividad']['aparcamientosBicis']
					},
					{
						nombre: "Número de aparcamientos para coches",
						valor: res['conectividad']['aparcamientosCoche']
					},
					{
						nombre: "Número de aparcamientos para motocicletas",
						valor: res['conectividad']['aparcamientosMotos']
					},
					{
						nombre: "Número de paradas de autobús",
						valor: res['conectividad']['paradasbus']
					},
					{
						nombre: "Número de paradas de tranvía",
						valor: res['conectividad']['paradastranvia']
					},
					{
						nombre: "Número de paradas de taxi",
						valor: res['conectividad']['paradataxis']
					}
				]
			},
			{
				nombre: "Economía",
				estrellas: res['economia']['estrellas'],
				apartados: [{
					nombre: "Renta per cápita",
					valor: res['economia']['renta'] + ' €'
				}]
			},
			{
				nombre: "Cultura y ocio",
				estrellas: res['cultura']['estrellas'],
				apartados: [
					{
						nombre: "Número de establecimientos de arte público",
						valor: res['cultura']['artepublico']
					},
					{
						nombre: "Número de hoteles",
						valor: res['cultura']['hoteles']
					},
					{
						nombre: "Número de monumentos",
						valor: res['cultura']['monumentos']
					},
					{
						nombre: "Número de puntos de interés",
						valor: res['cultura']['puntointeres']
					},
					{
						nombre: "Número de puntos de restaurantes",
						valor: res['cultura']['restaurantes']
					}
				]
			}
		];
	}

	guardarDemografia(demo) {
		this.catDemografia = {
			edadmedia: demo['edadmedia'],
			poblacionenvejecida: demo['poblacionenvejecida']
		}
		var jovenes = demo['poblacionjuvenil'];
		this.pieChartData.push(jovenes['grp_0_3']);
		this.pieChartData.push(jovenes['grp_4_11']);
		this.pieChartData.push(jovenes['grp_12_15']);
		this.pieChartData.push(jovenes['grp_16_18']);
	}

	like(idComentario, ordenar) {
		if (ordenar === 'Fecha') {
			ordenar = 0;
		}
		else {
			ordenar = 1;
		}

		console.log("LIKE");
		console.log(idComentario);
		this.barriosService.like(idComentario, this.idBarrio)
			.subscribe(res => {
				console.log("todo OK");
				this.refrescarComentarios();
			},
				err => {
					console.error(err);
				});
	}

	quitarlike(idComentario, ordenar) {
		if (ordenar === 'Fecha') {
			ordenar = 0;
		}
		else {
			ordenar = 1;
		}
		console.log("DISLIKE");
		console.log(idComentario);
		this.barriosService.quitarLike(idComentario, this.idBarrio)
			.subscribe(res => {
				console.log("todo OK");
				this.refrescarComentarios();
				//this.calcularNumEstrellas(this.infoBarrio);
			},
				err => {
					console.error(err);
				});
	}

	guardarValoraciones(res) {
		var i: number = 0;
		for (let valoracion of this.valoracionUsuarios) {
			this.valoracionUsuarios[i] = res[i];
			i++;
		}
		this.numValoracionesUsuarios = 0;
		for (let valor of this.valoracionUsuarios) {
			this.numValoracionesUsuarios += valor;
		}
		this.crearChart();
	}

	porcentajeDeValoraciones(i): number {
		if (this.numValoracionesUsuarios != 0) {
			return Math.round(this.valoracionUsuarios[i] * 100 / this.numValoracionesUsuarios);
		}
		else {
			return 0;
		}
	}

	valoracionMedia(): number {
		var acumulado: number = 0;
		for (let valor of this.valoracionUsuarios) {
			acumulado += valor;
		}
		return Math.round(acumulado / this.numValoracionesUsuarios);
	}

	refrescarChart() {
		this.barriosService.getValoracionesUsuarios(this.idBarrio).subscribe(res => {
			this.guardarValoraciones(res);
		})
	}

	crearChart() {
		this.AchartOptions = {
			series: [
				{
					name: "% Estrellas",
					data: [this.porcentajeDeValoraciones(4), this.porcentajeDeValoraciones(3), this.porcentajeDeValoraciones(2), this.porcentajeDeValoraciones(1), this.porcentajeDeValoraciones(0)]
				}
			],
			chart: {
				height: 200,
				type: "bar"
			},
			plotOptions: {
				bar: {
					horizontal: true,
				}
			},
			dataLabels: {
				enabled: true,
				formatter: function(val) {
					return val + " %";
				}
			},
			xaxis: {
				categories: ["5 estrellas", "4 estrellas", "3 estrellas", "2 estrellas", "1 estrella"],
				min: 0,
				max:100,
				labels: { show: false }
			},
			colors: ["#e8c500"],
		}
	}
}
