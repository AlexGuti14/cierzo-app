import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Label } from 'ng2-charts';
import { EstadisticasService } from 'src/app/services/estadisticas.service';


interface usuariosYadmins {
    usuarios: number;
    admins: number;
    baneados: number;
    logins: number;
}

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

    //Gráficos de barras
    barChartOptions: ChartOptions = {
        responsive: true,
    };
    barChartLabels: Label[] = [];
    barChartType: ChartType = 'bar';
    barChartLegend = false;
    barChartPlugins = [];
    barChartColorsVis: Array < any > = [{
        backgroundColor: ' #2252c0'
    }];
    barChartColorsVal: Array < any > = [{
        backgroundColor: ' #c0af22'
    }];
    barChartColorsCom: Array < any > = [{
        backgroundColor: ' #8e8e8e'
    }];

    coments: number[] = [];
    barChartDataComentarios: ChartDataSets[];
    
    visits: number[] = [];
    barChartDataVisualizaciones: ChartDataSets[];
    
    evals: number[] = [];
    barChartDataValoraciones: ChartDataSets[];

    logins: number;
    users: number;
    
    pieChartOptions: ChartOptions = {
        responsive: true,
    };
    pieChartType: ChartType = 'pie';
    pieChartPlugins = [];
    pieChartLegend = true;
    pieChartColorsU: Array < any > = [{
        backgroundColor: ['#72cdff', '#0000ff']
    }];
    pieChartColorsB: Array < any > = [{
        backgroundColor: ['#72cdff', '#ffff00']
    }];

    pieChartLabelsAdmins: Label[] = ['Usuarios','Administradores'];
    pieChartLabelsBans: Label[] = ['Usuarios','Baneados'];
    pieChartDataAdmins: SingleDataSet = [];
    pieChartDataBans: SingleDataSet = [];


    constructor(private router: Router, private statsService: EstadisticasService) { 
        this.statsService.getBarriosStats().subscribe(res => {
            res.forEach(element => {
                this.barChartLabels.push(element['nombre']);
                this.coments.push(element['comentarios']);
                this.visits.push(element['visitas']);
                this.evals.push(element['valoraciones'])
            });
        },
        err => {
            console.log(err);
        });
        this.barChartDataComentarios = [{ data: this.coments, label: 'Comentarios' }];
        this.barChartDataVisualizaciones = [{ data: this.visits, label: 'Visualizaciones' }];
        this.barChartDataValoraciones = [{ data: this.evals, label: 'Valoraciones' }];
        
        this.statsService.getUsersStats().subscribe(res => {
            this.pieChartDataAdmins.push(res['usuarios']-res['admins'],res['admins']);
            this.pieChartDataBans.push(res['usuarios']-res['banned'],res['banned']);
            this.logins = res['logins'];
            this.users = res['usuarios'];
        },
        err => {
            console.log(err);
        });
        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();
    }

    ngOnInit(): void {
    }

}
