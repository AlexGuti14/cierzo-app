import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppComponent } from './app.component';
import { LoaderService } from './services/loader.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormInicioSesionComponent } from './components/form-inicio-sesion/form-inicio-sesion.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs'; 
import { FormCrearUsuarioComponent } from './components/form-crear-usuario/form-crear-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { InicioSesionLandPageComponent } from './components/inicio-sesion-land-page/inicio-sesion-land-page.component';
import { HomeComponent } from './components/home/home.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RankingComponent } from './components/ranking/ranking.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { InfoBarrioComponent } from './components/info-barrio/info-barrio.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { TarjetaRankingComponent } from './components/tarjeta-ranking/tarjeta-ranking.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthInterceptor } from './services/auth.interceptor';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BottomSheetEliminarCuentaComponent } from './components/bottom-sheet-eliminar-cuenta/bottom-sheet-eliminar-cuenta.component';
import { BoxInsertarComentarioComponent } from './components/box-insertar-comentario/box-insertar-comentario.component';
import { MatSelectModule } from '@angular/material/select';
import { MapaComponent } from './components/mapa/mapa.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { BottomSheetOpcionesComentarioComponent } from './components/bottom-sheet-opciones-comentario/bottom-sheet-opciones-comentario.component';
import { BottomSheetEliminarCuentaAdminComponent } from './components/bottom-sheet-eliminar-cuenta-admin/bottom-sheet-eliminar-cuenta-admin.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { FaqComponent } from './components/faq/faq.component';
import { UsuariosBaneadosComponent } from './components/usuarios-baneados/usuarios-baneados.component';
import { TarjetaUsuarioBaneadoComponent } from './components/tarjeta-usuario-baneado/tarjeta-usuario-baneado.component';
import { TarjetaUsuarioComponent } from './components/tarjeta-usuario/tarjeta-usuario.component';
import { NgxPaginationModule } from 'ngx-pagination';

const appRoutes: Routes = [
	{ path: 'nuevo-usuario', component: FormCrearUsuarioComponent },
	{ path: 'inicio-sesion', component: FormInicioSesionComponent },
	{ path: 'land-page-google/:token/:admin/:banned/:id', component: InicioSesionLandPageComponent },
	{ path: 'mapaPrueba1', component: MapaComponent },
	{ path: 'mapaPrueba2', component: HomeComponent },
	{
		path: '', component: SidenavComponent, children: [
			{ path: '', redirectTo: 'home', pathMatch: 'full' },
			{ path: 'home', component: HomeComponent },
			{ path: 'ranking', component: RankingComponent },
			{ path: 'perfil', component: PerfilComponent },
			{ path: 'info-barrio/:idBarrio', component: InfoBarrioComponent },
			{ path: 'estadisticas', component: EstadisticasComponent },
			{ path: 'sobreNosotros', component: SobreNosotrosComponent},
			{ path: 'faq', component: FaqComponent},
			{ path: 'baneados', component: UsuariosBaneadosComponent }
		]
	},
]

@NgModule({
	declarations: [
		AppComponent,
		FormInicioSesionComponent,
		FormCrearUsuarioComponent,
		InicioSesionLandPageComponent,
		HomeComponent,
		SidenavComponent,
		RankingComponent,
		PerfilComponent,
		InfoBarrioComponent,
		TarjetaRankingComponent,
		ComentarioComponent,
		BottomSheetEliminarCuentaComponent,
		BoxInsertarComentarioComponent,
		MapaComponent,
		EstadisticasComponent,
		BottomSheetOpcionesComentarioComponent,
		BottomSheetEliminarCuentaAdminComponent,
		LoaderComponent,
		SobreNosotrosComponent,
		FaqComponent,
		UsuariosBaneadosComponent,
		TarjetaUsuarioBaneadoComponent,
		TarjetaUsuarioComponent
	],
	imports: [
		BrowserModule,
  		ReactiveFormsModule,
  		NgApexchartsModule,
		MatProgressSpinnerModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		ReactiveFormsModule,
		RouterModule.forRoot(
			appRoutes,
			{ enableTracing: false }	// <-- debugging purposes only
		),
		MatIconModule,
		LeafletModule,
		MatListModule,
		MatSidenavModule,
		MatToolbarModule,
		MatExpansionModule,
		MatCardModule,
		MatBottomSheetModule,
		MatSelectModule,
		MatTabsModule,
		ChartsModule,
		NgxPaginationModule
	],
	providers: [
		LoaderService,
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy
		},
		/* { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }, */
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}],
	bootstrap: [AppComponent]
})
export class AppModule { }
