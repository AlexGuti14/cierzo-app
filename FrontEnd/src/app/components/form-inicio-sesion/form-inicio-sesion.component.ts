import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios-services.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-form-inicio-sesion',
	templateUrl: './form-inicio-sesion.component.html',
	styleUrls: ['./form-inicio-sesion.component.css']
})
export class FormInicioSesionComponent implements OnInit {

	usuario = new FormGroup({
		email: new FormControl(''),
		password: new FormControl('')
	})

	showErrorMessage = false;

	constructor(
		private usuariosService: UsuariosService,
		private router: Router) { }

	ngOnInit(): void {
	}

	onSubmit() {
		this.usuariosService.login(this.usuario.value)
			.subscribe(
				res => {
					//al salir de la sesion poner localStorage.remove(item)
					localStorage.setItem('token', res['token']);
					localStorage.setItem('admin', res['admin']);
					localStorage.setItem('banned', res['banned']);
					localStorage.setItem('id', res['id']);
					this.router.navigate([`home`]);
				},
				err => {
					console.log(err);
					console.log("Error al iniciar sesion");
					this.showErrorMessage = true;
				});
	}

	loginGoogle() {
		this.usuariosService.loginGoogle();
	}
}