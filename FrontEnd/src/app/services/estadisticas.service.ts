import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class EstadisticasService {

    constructor(private http: HttpClient) { }
    
    getBarriosStats() {
        return this.http.get<Array<JSON>>(API_URL+'/district/stats');
    }

    getUsersStats() {
        return this.http.get<JSON>(API_URL+'/user/stats');
    }   

    /*
    getFuentesStats() {
        return this.http.get<Array<JSON>>(API_URL+'/fuentes');
    }
    */
} 
