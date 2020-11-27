import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private router: Router) { }

	intercept(req: HttpRequest<any>,
		next: HttpHandler): Observable<HttpEvent<any>> {

		const idToken: string = localStorage.getItem("token");
		if (idToken) {
			const cloned = req.clone({
				headers: req.headers.set('Authorization',
					'Bearer ' + idToken)
			});
			return next.handle(cloned);
		}
		else if (req.url == (API_URL + "/user/login")
			|| req.url == (API_URL + "/user"
				|| req.url == (API_URL + "/user/loginGoogle"))) {
			return next.handle(req);
		}
		else {
			this.router.navigate(['inicio-sesion']);
		}
	}
}