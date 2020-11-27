import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios-services.service'
import { Location } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
	selector: 'app-form-crear-usuario',
	templateUrl: './form-crear-usuario.component.html',
	styleUrls: ['./form-crear-usuario.component.css']
})
export class FormCrearUsuarioComponent implements OnInit {

	usuario = new FormGroup({
		nombreUsuario: new FormControl('', [
			Validators.required/* ,
			Validators.pattern("^[a-z_.]+[a-z0-9._]*") */
		]),
		correo: new FormControl('', [
			Validators.required,
			Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
		]),
		password: new FormControl('', [
			Validators.required,
			Validators.pattern("^[a-zA-Z0-9._]{4,20}")
		])
	});

	passwordInvalida: boolean = false;
	emailInvalido: boolean = false;

	constructor(private usuariosService: UsuariosService,
		private router: Router,
		private location: Location,
		iconRegistry: MatIconRegistry,
		sanitizer: DomSanitizer) {
		iconRegistry.addSvgIcon(
			'goBack',
			sanitizer.bypassSecurityTrustResourceUrl('src\assets\icons\goBack.svg'));
	}

	ngOnInit(): void {
	}

	onSubmit() {
		console.log(this.usuario)
		if (this.usuario.controls.password.invalid) {
			this.passwordInvalida = true;
		}
		if (this.usuario.controls.correo.invalid) {
			this.emailInvalido = true;
		}
		if (this.usuario.controls.password.valid && this.usuario.controls.correo.valid) {
			this.usuariosService.crearUsuario(this.usuario.value).subscribe(res => {
				console.log("Nuevo usuario creado");
				this.router.navigate([`inicio-sesion`]);
			},
				err => {
					console.error(err);
					console.log("Error al crear nuevo usuario");
				});
		}
	}

	goBack() {
		this.location.back()
	}

}
