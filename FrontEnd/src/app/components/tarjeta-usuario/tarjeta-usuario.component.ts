import { Component, OnInit, Input } from '@angular/core';
import { user, UsuariosBaneadosComponent } from '../usuarios-baneados/usuarios-baneados.component';
import { UsuariosService } from 'src/app/services/usuarios-services.service';

@Component({
  selector: 'app-tarjeta-usuario',
  templateUrl: './tarjeta-usuario.component.html',
  styleUrls: ['./tarjeta-usuario.component.css']
})
export class TarjetaUsuarioComponent implements OnInit {

  @Input()
  infoUser: user;

  constructor(private usuarioService: UsuariosService, private pantallaUsuarios: UsuariosBaneadosComponent) { }

  ngOnInit(): void {
  }

  banearUser() {
    this.usuarioService.banUsuario(this.infoUser.id).subscribe();
    this.pantallaUsuarios.refrescarListaBaneados();
    this.pantallaUsuarios.refrescarListaTotales();
  }

  desbanearUser() {
    this.usuarioService.unbanUsuario(this.infoUser.id).subscribe();
    this.pantallaUsuarios.refrescarListaBaneados();
    this.pantallaUsuarios.refrescarListaTotales();
  }

  eliminarUser() {
    this.usuarioService.eliminarUsuario(this.infoUser.id).subscribe();
    this.pantallaUsuarios.refrescarListaBaneados();
    this.pantallaUsuarios.refrescarListaTotales();
  }
}
