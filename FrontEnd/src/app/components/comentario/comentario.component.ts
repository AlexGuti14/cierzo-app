import { Component, OnInit, Input } from '@angular/core';
import { BottomSheetOpcionesComentarioComponent } from '../bottom-sheet-opciones-comentario/bottom-sheet-opciones-comentario.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UsuariosService } from 'src/app/services/usuarios-services.service';
import { BottomSheetEliminarCuentaAdminComponent } from '../bottom-sheet-eliminar-cuenta-admin/bottom-sheet-eliminar-cuenta-admin.component';
import { InfoBarrioComponent } from '../info-barrio/info-barrio.component';
import { BarriosService } from 'src/app/services/barrios-services.service';

@Component({
	selector: 'app-comentario',
	templateUrl: './comentario.component.html',
	styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

	@Input()
	nombreUsuario: string;
	@Input()
	userId: string;
	@Input()
	email: string;
	@Input()
	comentario: String;
	@Input()
	idComentario: String;
	@Input()
	idBarrio: String;
	@Input()
	opinion: number;
	@Input()
	esAdmin: boolean;

	constructor(private bottomSheet: MatBottomSheet,
		private usuariosService: UsuariosService,
		private barriosService: BarriosService,
		private infobarrio: InfoBarrioComponent) { }

	ngOnInit(): void {
	}

	verOpcionesAdmin() {
		this.bottomSheet.open(BottomSheetOpcionesComentarioComponent, {
			data: {
				nombreUsuario: this.nombreUsuario,
				userId: this.userId,
				email: this.email,
				idComentario: this.idComentario,
				idBarrio: this.idBarrio
			}
		})
		this.bottomSheet._openedBottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
			// Entra si se selecciona Eliminar cuenta
			if (dataFromChild == "deletePermanently") {
				this.eliminarUsuario();
			}
			// Entra si se selecciona Banear Usuario
			else if (dataFromChild == "banearUsuario") {
				this.banearUsuario();
			}
			else if (dataFromChild == "borrarComentario") {
				this.borrarComentario();
			}
		})
	}

	eliminarUsuario() {
		this.bottomSheet.open(BottomSheetEliminarCuentaAdminComponent, {
			data: this.userId
		});
		this.bottomSheet._openedBottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
			// Entra si se selecciona Eliminar cuenta definitivamente
			if (dataFromChild == "deletePermanently") {
				this.eliminarDefinitivamente();
			}
		})
	}

	eliminarDefinitivamente() {
		this.usuariosService.eliminarUsuario(this.userId)
			.subscribe(res => {
				console.log("Cuenta eliminada correctamente");
				this.infobarrio.refrescarComentarios();
			},
				err => {
					console.error("Error al eliminar la cuenta")
					alert("Error al eliminar la cuenta");
				});
	}

	banearUsuario() {
		this.barriosService.banearUsuario(this.userId)
			.subscribe(res => {
				console.log("Usuario baneado");
				console.log(res);
			},
				err => {
					console.error("Error al banear al usuario");
					alert("No ha sido posible banear al usuario");
				});
	}

	borrarComentario() {
		this.barriosService.eliminarComentario(this.idBarrio, this.idComentario)
			.subscribe(res => {
				console.log("Comentario borrado");
				this.infobarrio.refrescarComentarios();
			},
				err => {
					console.error("Error al borrar comentario");
					alert("No ha sido posible eliminar el comentario");
				});
	}
}
