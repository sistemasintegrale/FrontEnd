import { Component, OnInit } from '@angular/core';
import { ReporteHistorialService } from 'src/app/services/reporte-historial.service';
import { ReporteHistorialResponse } from '../../../models/reporte-historial/reporte-historial-response';
import { ReporteHistorialFilters } from 'src/app/interfaces/reporte-historial/reporte-historial-filters';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from "@angular/material/core";
import * as moment from 'moment';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-reporte-historial',
  templateUrl: './reporte-historial.component.html',
  styleUrls: ['./reporte-historial.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class ReporteHistorialComponent implements OnInit {
  public reporte: ReporteHistorialResponse[] = [];
  public filters = {} as ReporteHistorialFilters;
  public cargando = false;
  public formSubmitted = false;
  public totalUsuarios: number = 0;
  public cantidadRegistros: number = 10;
  constructor(private reporteService: ReporteHistorialService,
    private fb: FormBuilder) { }
  ngOnInit(): void {

  }
  public range: any = this.fb.group({
    fechaDesde: ['', [Validators.required]],
    fechaHasta: ['', [Validators.required]],
    desde: [0, [Validators.required]],
    hasta: [10, [Validators.required]]
  });

  cargarReporte() {
    debugger
    this.cargando = true;
    this.filters.desde = this.range.value.desde;
    this.filters.hasta = this.range.value.hasta;
    this.filters.fechaDesde = moment(this.range.value.fechaDesde).format("DD/MM/YYYY");
    this.filters.fechaHasta = moment(this.range.value.fechaHasta).format("DD/MM/YYYY");

    this.reporteService.cargarReporteHistorial(this.filters)
      .subscribe(resp => {
        this.reporte = [];
        this.reporte = resp.data.data
        this.totalUsuarios = resp.cantidad;
        this.cargando = false;
        console.log(resp)
      });
  }

  buscar() {
    this.formSubmitted = true;
    if (this.range.invalid)
      return;
    this.cargarReporte();
  }
  campoNoValido(campo: string): boolean {
    return this.range.get(campo)?.invalid! && this.formSubmitted;
  }

  cambiarPagina(valor: number) {
    const valorAnterior = this.range.value.desde;
    this.range.value.desde += valor;
    if (this.range.value.desde < 0) {
      this.range.value.desde = 0;
    } else if (this.range.value.desde >= this.totalUsuarios) {
      this.range.value.desde -= valor;
    }
    if (valorAnterior !== this.range.value.desde) {
      this.cargarReporte();
    }

  }
}
