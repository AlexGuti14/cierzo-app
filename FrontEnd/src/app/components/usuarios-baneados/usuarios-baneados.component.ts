import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios-services.service';

export interface user {
	id: string,
	nombre: string,
	email: string,
	logins: number,
	lastLogin: Date,
	createdOn: Date,
	admin: boolean,
	banned: boolean
}

@Component({
	selector: 'app-usuarios-baneados',
	templateUrl: './usuarios-baneados.component.html',
	styleUrls: ['./usuarios-baneados.component.css']
})
export class UsuariosBaneadosComponent implements OnInit {

	pageTotal: number = 1;
	pageBan: number = 1;
	pageSize: number = 5;

	listaUsersb: user[] = [];
	pageBans: Array<any>;
	listaUsers: user[] = [];
	pageUsers: Array<any>;

	constructor(private usuariosService: UsuariosService) {
		this.refrescarListaBaneados();
		this.refrescarListaTotales();
	}

	ngOnInit(): void {
	}

	refrescarListaBaneados() {
		this.listaUsersb = [];
		this.usuariosService.getBaneados().subscribe(
			res => {
				this.listaUsers = [];
				for (let usuario of res){
					this.listaUsersb.push({
						nombre: usuario['name'],
						id: usuario['_id'],
						email: usuario['email'],
						logins: usuario['logins'],
						lastLogin: usuario['lastLoginOn'],
						createdOn: usuario['createdOn'],
						admin: usuario['admin'],
						banned: usuario['banned']
					})
				}	
			}
		)
	}

	refrescarListaTotales() {
		this.listaUsers = [];
		this.usuariosService.getAllUsers().subscribe(
			res => {
				this.listaUsers = [];
				for (let usuario of res){
					this.listaUsers.push({
						nombre: usuario['name'],
						id: usuario['_id'],
						email: usuario['email'],
						logins: usuario['logins'],
						lastLogin: usuario['lastLoginOn'],
						createdOn: usuario['createdOn'],
						admin: usuario['admin'],
						banned: usuario['banned']
					})
				}	
			}
		)
	}

}
