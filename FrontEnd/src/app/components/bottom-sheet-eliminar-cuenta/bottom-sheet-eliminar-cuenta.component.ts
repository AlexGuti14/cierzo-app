import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UsuariosService } from 'src/app/services/usuarios-services.service';
import { Router } from '@angular/router';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
	selector: 'app-bottom-sheet-eliminar-cuenta',
	templateUrl: './bottom-sheet-eliminar-cuenta.component.html',
	styleUrls: ['./bottom-sheet-eliminar-cuenta.component.css']
})
export class BottomSheetEliminarCuentaComponent {

	constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetEliminarCuentaComponent>,
		private usuariosService: UsuariosService,
		private router: Router,
		@Inject(MAT_BOTTOM_SHEET_DATA) public data) { }

	eliminarCuentaDefinitivamente() {
		this.usuariosService.eliminarUsuario(this.data)
			.subscribe(res => {
				console.log("Cuenta eliminada correctamente");
				localStorage.removeItem('token');
				this._bottomSheetRef.dismiss();
				this.router.navigate([`inicio-sesion`]);
			},
				err => {
					console.error("Error al eliminar la cuenta")
					alert("Error al eliminar la cuenta");
					this._bottomSheetRef.dismiss();
				});
	}
}
