import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BarriosService } from 'src/app/services/barrios-services.service';
import { InfoBarrioComponent } from 'src/app/components/info-barrio/info-barrio.component';

@Component({
	selector: 'app-box-insertar-comentario',
	templateUrl: './box-insertar-comentario.component.html',
	styleUrls: ['./box-insertar-comentario.component.css']
})
export class BoxInsertarComentarioComponent implements OnInit {

	comentario = new FormGroup({
		comentario: new FormControl('')
	})

	@Input()
	idBarrio: number;

	constructor(private barriosservices: BarriosService,
		private infobarrio: InfoBarrioComponent) { }

	ngOnInit(): void {
	}

	onSubmit() {
		this.barriosservices.insertarComentario(this.idBarrio, this.comentario.value['comentario'])
			.subscribe(
				res => {
					this.infobarrio.refrescarComentarios();

				},
				err => {
					console.log(err);
					alert("No se ha podido añadir su comentario");
				});

	}

}
