import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetEliminarCuentaAdminComponent } from '../bottom-sheet-eliminar-cuenta-admin/bottom-sheet-eliminar-cuenta-admin.component';
import { BarriosService } from 'src/app/services/barrios-services.service';
import { UsuariosService } from 'src/app/services/usuarios-services.service';

@Component({
	selector: 'app-bottom-sheet-opciones-comentario',
	templateUrl: './bottom-sheet-opciones-comentario.component.html',
	styleUrls: ['./bottom-sheet-opciones-comentario.component.css']
})
export class BottomSheetOpcionesComentarioComponent implements OnInit {

	constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOpcionesComentarioComponent>,
		@Inject(MAT_BOTTOM_SHEET_DATA) public data,
		private bottomSheet: MatBottomSheet,
		private barriosService: BarriosService,
		private usuariosService: UsuariosService) { }

	ngOnInit(): void {
	}

	borrarComentario() {
		this._bottomSheetRef.dismiss("borrarComentario");
	}

	banearUsuario() {
		this._bottomSheetRef.dismiss("banearUsuario");
	}

	eliminarCuenta() {
		this._bottomSheetRef.dismiss("deletePermanently");
	}
}
