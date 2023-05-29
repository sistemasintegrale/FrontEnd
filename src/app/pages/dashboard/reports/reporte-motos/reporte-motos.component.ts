import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { MY_DATE_FORMATS } from 'src/app/interfaces/configurations/MY_DATE_FORMATS';
import { ReporteHistorialFilters } from 'src/app/interfaces/reporte-historial/reporte-historial-filters';
import { ReporteHistorialResponse } from 'src/app/models/reporte-historial/reporte-historial-response';
import { CustomPaginatorLabelService } from 'src/app/services/custom-paginator-label.service';
import { ReporteMotosService } from 'src/app/services/reporte-motos.service';

@Component({
  selector: 'app-reporte-motos',
  templateUrl: './reporte-motos.component.html',
  styleUrls: ['./reporte-motos.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class ReporteMotosComponent {
  public reporte: ReporteHistorialResponse[] = [];
  public filters = {} as ReporteHistorialFilters;
  public formSubmitted = false;
  public totalReporte: number = 0;
  public desde: number = 0;
  public hasta: number = 10;
  @ViewChild(MatPaginator, {static :true}) paginator !: MatPaginator;
  public cargando: boolean = false;
  displayedColumns: string[] = [
    'placa',
    'nombreCliente',
    'marca',
    'modelo',
    'numeroOrden',
    'situacion',
    'numeroDocumento',
    'fechaOrden',
    'descripcionTipoServicio',
    'kilometraje',
    'cantidad',
    'descripcionServicio',
    'precioTotalItem'
  ];

  constructor(
    private reporteService: ReporteMotosService,
    private fb: FormBuilder,
    private customPaginatorLabel : CustomPaginatorLabelService
  ) { }
  ngOnInit(): void {
    this.customPaginatorLabel.translateMatPaginator(this.paginator);

   }
  public range: any = this.fb.group({
    fechaDesde: ['', [Validators.required]],
    fechaHasta: ['', [Validators.required]],
  });



  cargarReporte() {
    debugger
    this.cargando = true;
    this.filters.desde = this.desde;
    this.filters.hasta = this.hasta;
    this.filters.fechaDesde = moment(this.range.value.fechaDesde).format(
      'DD/MM/YYYY'
    );
    this.filters.fechaHasta = moment(this.range.value.fechaHasta).format(
      'DD/MM/YYYY'
    );

    this.reporteService
      .cargarReporteHistorial(this.filters)
      .subscribe((resp) => {
        this.reporte = resp.data.data;
        this.totalReporte = resp.cantidad;
        this.cargando = false;
        console.log(resp);
      });
  }

  buscar() {
    this.formSubmitted = true;
    if (this.range.invalid) return;

    this.paginator.pageIndex = 0;


    this.cargarReporte();
  }
  campoNoValido(campo: string): boolean {
    return this.range.get(campo)?.invalid! && this.formSubmitted;
  }

  public cantidadRequeridaAnt: number = 10;
  getPaginationData(event: PageEvent) : PageEvent {
    if (this.cantidadRequeridaAnt !== event.pageSize) {
      this.paginator.pageIndex = 0;
      this.desde = 0;
      this.hasta = event.pageSize;
      this.cantidadRequeridaAnt = event.pageSize;
      if (this.range.invalid) return event;
    } else {
      const newIndex = event.pageIndex + 1;
      this.hasta = event.pageSize * newIndex;
      this.desde = this.hasta - event.pageSize;
    }
    this.cargarReporte();
    return event;
  }
}
