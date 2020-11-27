import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UsuariosService } from 'src/app/services/usuarios-services.service';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
	selector: 'app-bottom-sheet-eliminar-cuenta-admin',
	templateUrl: './bottom-sheet-eliminar-cuenta-admin.component.html',
	styleUrls: ['./bottom-sheet-eliminar-cuenta-admin.component.css']
})
export class BottomSheetEliminarCuentaAdminComponent {

	constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetEliminarCuentaAdminComponent>,
		private usuariosService: UsuariosService,
		@Inject(MAT_BOTTOM_SHEET_DATA) public data) { }

	eliminarCuentaDefinitivamente() {
		this._bottomSheetRef.dismiss("deletePermanently");
	}

}
