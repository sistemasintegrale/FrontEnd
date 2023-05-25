import { Component, OnInit } from '@angular/core';
import { ReporteHistorialService } from 'src/app/services/reporte-historial.service';
import { ReporteHistorialResponse } from '../../../models/reporte-historial/reporte-historial-response';
import { ReporteHistorialFilters } from 'src/app/interfaces/reporte-historial/reporte-historial-filters';

@Component({
  selector: 'app-reporte-historial',
  templateUrl: './reporte-historial.component.html',
  styleUrls: ['./reporte-historial.component.css'],
})
export class ReporteHistorialComponent implements OnInit {
  public reporte: ReporteHistorialResponse[] = [];
  public filters= {}as ReporteHistorialFilters;
  public cargando = true;
  constructor(private reporteService: ReporteHistorialService) {}
  ngOnInit(): void {
    this.cargarReporte();
  }

  cargarReporte(){
    this.filters.desde = 0;
    this.filters.hasta = 10;
    this.filters.fechaDesde = '2023-04-01';
    this.filters.fechaHasta = '2023-05-01';
    this.cargando = true;
    this.reporteService.cargarReporteHistorial(this.filters)
    .subscribe(resp =>{
        this.reporte = resp.data.data
      this.cargando = false;
    });
  }
}
