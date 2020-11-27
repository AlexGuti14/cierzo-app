import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
	providedIn: 'root'
})
export class BarriosService {

	constructor(private http: HttpClient) { }

	getBarrios() {
		return this.http.get<ArrayBuffer>(API_URL + '/district');
	}

	getInfoBarrio(idBarrio) {
		return this.http.get<JSON>(API_URL + '/district/' + idBarrio);
	}

	getInfoBarrioAyto(idBarrio) {
		return this.http.get<JSON>(API_URL + '/district/externdata/' + idBarrio);
	}

	insertarComentario(idBarrio, comentario) {
		var body = { text: comentario };
		return this.http.post(API_URL + '/comment/' + idBarrio + '/comment', body);
	}

	getComentarios(idBarrio, ordenar) {
		return this.http.get<Array<JSON>>(API_URL + '/comment/' + idBarrio + '/comment/' + ordenar);
	}

	eliminarComentario(idBarrio, idComentario) {
		return this.http.delete(API_URL + '/comment/' + idBarrio + '/comment/' + idComentario, { responseType: 'text' });
	}

	banearUsuario(idUsuario) {
		console.log(idUsuario);
		return this.http.put(API_URL + '/user/ban/' + idUsuario, null, { responseType: 'text' });
	}

	like(idComentario, idBarrio){
		console.log("en barrios services - like");
		return this.http.put(API_URL + '/comment/' + idBarrio + '/comment/' + idComentario + '/1', null, { responseType: 'text' });	
	}

	quitarLike(idComentario, idBarrio){
		console.log("en barrios services - dislike");
		return this.http.put(API_URL + '/comment/' + idBarrio + '/comment/' + idComentario + '/0', null, { responseType: 'text' });	
	}

	getValoracionesUsuarios(idBarrio){
		return this.http.get<Array<number>>(API_URL + '/district/' + idBarrio + '/valuation');
	}

	getBarriosOrdenadosSegunRanking(filtro){
		return this.http.get<JSON[]>(API_URL + '/district/filter/' + filtro);
	}

	getMyValuation(idBarrio){
		return this.http.get(API_URL + '/district/' + idBarrio + '/valuation/myvaluation');
	}

	addValuation(valuation, idBarrio){
		var body = {score: valuation};
		return this.http.post(API_URL + '/district/' + idBarrio + '/valuation', body, { responseType: 'text' });
	}

	updateValuation(valuation, idBarrio){
		var body = {score: valuation};
		return this.http.put(API_URL + '/district/' + idBarrio + '/valuation', body, { responseType: 'text' });
	}
}
