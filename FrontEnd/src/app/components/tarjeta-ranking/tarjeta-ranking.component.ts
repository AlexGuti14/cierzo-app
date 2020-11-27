import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { categoria, barrio } from '../ranking/ranking.component'

@Component({
	selector: 'app-tarjeta-ranking',
	templateUrl: './tarjeta-ranking.component.html',
	styleUrls: ['./tarjeta-ranking.component.css']
})
export class TarjetaRankingComponent {

	@Input()
	infoBarrio: barrio;

	constructor(private router: Router) { }

	estrellasRellenas(i) {
		return new Array(Math.round(i));
	}

	estrellasVacias(i) {
		return new Array(5 - Math.round(i));
	}

	redirigirInfoBarrio() {
		this.router.navigate([`info-barrio/${this.infoBarrio['idBarrio']}`]);
	}

}
