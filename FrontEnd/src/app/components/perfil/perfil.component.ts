import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuariosService } from '../../services/usuarios-services.service'
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetEliminarCuentaComponent } from '../bottom-sheet-eliminar-cuenta/bottom-sheet-eliminar-cuenta.component';
import { FormControl, FormGroup } from '@angular/forms';

interface usuario {
	id: string;
	nombre: string;
	email: string;
	iniciosSesion: number;
	password: string;
}

interface usuarioDTO {
	id: string;
	name: string;
	email: string;
	password: string;
}

@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.component.html',
	styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

	usuario: usuario;
	sendUser: usuarioDTO;

	showInputUsername = false;
	showInputPassword = false;

	cambiarUsuario = new FormGroup({
		newUsername: new FormControl(''),
		newPassword: new FormControl('')
	})

	constructor(private router: Router,
		private usuariosService: UsuariosService,
		private bottomSheet: MatBottomSheet) {
		this.usuariosService.getUsuario()
			.subscribe(res => {
				this.usuario = {
					id: res['_id'],
					nombre: res['name'],
					email: res['email'],
					iniciosSesion: res['logins'],
					password: res['password']
				}
				this.sendUser = {
					id: res['_id'],
					name: res['name'],
					email: res['email'],
					password: res['password']
				}
			})
	}

	mostrarCambiarUsername() {
		this.showInputUsername = !this.showInputUsername;
	}

	cambiarUsername() {
		this.showInputUsername = false;
		this.sendUser.name = this.cambiarUsuario.value.newUsername;
		this.usuariosService.modificarUsuario(this.sendUser)
			.subscribe(res => {
				window.location.reload();
			},
			err => {
				alert("No ha sido posible modificar el usuario");
				console.error(err);
			});
		this.cambiarUsuario.value.newUsername = "";
	}

	mostrarCambiarPassword() {
		this.showInputPassword = !this.showInputPassword;
	}

	cambiarPassword() {
		this.showInputPassword = false;
		this.sendUser.password = this.cambiarUsuario.value.newPassword;
		this.usuariosService.modificarUsuario(this.sendUser)
			.subscribe(res => {
				window.location.reload();
			},
			err => {
				alert("No ha sido posible modificar la contraseña");
				console.error(err);
			});
		this.cambiarUsuario.value.newPassword = "";
		//window.location.reload();
	}

	cerrarSesion() {
		//Mensaje de confirmación??
		localStorage.removeItem('token');
		localStorage.removeItem('admin');
		this.router.navigate(['inicio-sesion']);
	}

	avisoEliminarCuenta() {
		console.log("Aviso de eliminar cuenta");
		this.bottomSheet.open(BottomSheetEliminarCuentaComponent, {
			data: this.usuario.id
		});
	}
}
