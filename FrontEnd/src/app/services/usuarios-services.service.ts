import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
	providedIn: 'root'
})
export class UsuariosService {

	constructor(private http: HttpClient) { }

	crearUsuario(usuario) {
		var body = { username: usuario.nombreUsuario, password: usuario.password, email: usuario.correo };
		return this.http.post(API_URL + '/user', body, { responseType: 'text' });
	}

	login(usuario) {
		var body = { email: usuario.email, password: usuario.password };
		return this.http.post(API_URL + '/user/login', body, { responseType: 'json' });
	}

	loginGoogle() {
		window.location.href = API_URL + '/user/loginGoogle';
	}

	getUsuario() {
		return this.http.get<JSON>(API_URL + '/user');
	}

	getAllUsers() {
		return this.http.get<JSON[]>(API_URL + '/user/users');
	}

	getBaneados() {
		return this.http.get<JSON[]>(API_URL + '/user/ban');
	}

	banUsuario(idUsuario) {
		return this.http.put(API_URL + '/user/ban/' + idUsuario, null, { responseType: 'text' });
	}

	unbanUsuario(idUsuario) {
		return this.http.put(API_URL + '/user/unban/' + idUsuario, null, { responseType: 'text' });
	}
	
	modificarUsuario(usuario) {
		var body = { name: usuario.name, password: usuario.password, email: usuario.email };
		return this.http.put(API_URL + '/user/' + usuario.id, body, { responseType: 'text' });
	}

	eliminarUsuario(id) {
		return this.http.delete(API_URL + '/user/' + id, { responseType: 'text' });
	}
}
