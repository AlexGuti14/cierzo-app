import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { UsuariosService } from 'src/app/services/usuarios-services.service';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

	mobileQuery: MediaQueryList;

	fillerNav = [
		{ name: "Mapa", route: "/home", icon: "public" },
		{ name: "Ranking", route: "/ranking", icon: "emoji_events" },
		{ name: "Perfil", route: "/perfil", icon: "face" },
	]

	fillerDownNav = [
		{ name: "About us", route: "/sobreNosotros", icon: "code"},
		{ name: "FAQ", route: "/faq", icon: "help"}
	]

	esAdmin: boolean = false;

	private _mobileQueryListener: () => void;

	constructor(changeDetectorRef: ChangeDetectorRef,
		media: MediaMatcher,
		private usuariosService: UsuariosService) {
		if (localStorage.getItem('admin') == "true") {
			this.fillerNav.push(
				{ name: "Estadísticas", route: "/estadisticas", icon: "bar_chart" },
				{ name: "Gestión usuarios", route: "/baneados", icon: "supervisor_account" },
			)
		}
	}

	shouldRun = true;

}
