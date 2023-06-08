import { Component, OnInit, ViewChild } from '@angular/core';
import { ReporteHistorialService } from 'src/app/services/reporte-historial.service';
import { ReporteHistorialFilters } from 'src/app/interfaces/reporte-historial/reporte-historial-filters';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CustomPaginatorLabelService } from 'src/app/services/custom-paginator-label.service';
import { ReporteHistorialResponse } from 'src/app/models/reporte-historial/reporte-historial-response';
import { MY_DATE_FORMATS } from 'src/app/interfaces/configurations/MY_DATE_FORMATS';
import { SelectsService } from 'src/app/services/selects.service';
import { Marca } from 'src/app/interfaces/reporte-historial/marca';
import { Modelo } from 'src/app/interfaces/reporte-historial/modelo';
import { Placa } from 'src/app/interfaces/reporte-historial/placa';
import { OrdenReparacion } from 'src/app/interfaces/reporte-historial/OR';
import { environment } from 'src/environments/environments';

 

@Component({
  selector: 'app-reporte-historial',
  templateUrl: './reporte-historial.component.html',
  styleUrls: ['./reporte-historial.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class ReporteHistorialComponent implements OnInit {
  public reporte: ReporteHistorialResponse[] = [];
  public marcas : Marca[] =[];
  public modelos : Modelo[] =[];
  public placas : Placa[] =[];
  public ordenes : OrdenReparacion[] =[];
  public filters = {} as ReporteHistorialFilters;
  public formSubmitted = false;
  public totalReporte: number = 0;
  public desde: number = 0;
  public hasta: number = 10;
  service = environment.CONN_NOVAGLASS;
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
    private reporteService: ReporteHistorialService,
    private fb: FormBuilder,
    private customPaginatorLabel : CustomPaginatorLabelService,
    private selectService : SelectsService
  ) { }
  ngOnInit(): void {
    this.customPaginatorLabel.translateMatPaginator(this.paginator);
    this.cargarMarca();
    this.cargarModelo();
    this.cargarPlaca();
    this.cargarOR();
   }


  public range: any = this.fb.group({
    fechaDesde: ['', [Validators.required]],
    fechaHasta: ['', [Validators.required]],
    marca:[0],
    modelo:[0],
    placa:[0],
    orden:[0],
  });

  cargarMarca(){
    this.selectService.cargarSelectMarca(this.service)
    .subscribe(
      {
        next:(res=>{
          this.marcas = res.data;
        } )
      }
    )
  }

  cargarModelo(){
    this.selectService.cargarSelectModelo(this.service)
    .subscribe(
      {
        next:(res=>{
          this.modelos = res.data;
        } )
      }
    )
  }

  cargarPlaca(){
    this.selectService.cargarSelectPlaca(this.service)
    .subscribe(
      {
        next:(res=>{
          this.placas = res.data;
        } )
      }
    )
  }

  cargarOR(){
    this.selectService.cargarSelectOR(this.service)
    .subscribe(
      {
        next:(res=>{
          this.ordenes = res.data;
        } )
      }
    )
  }

  cargarReporte() {
    this.cargando = true;
    this.filters.desde = this.desde;
    this.filters.hasta = this.hasta;
    this.filters.fechaDesde = moment(this.range.value.fechaDesde).format(
      'DD/MM/YYYY'
    );
    this.filters.fechaHasta = moment(this.range.value.fechaHasta).format(
      'DD/MM/YYYY'
    );
    this.filters.marca = this.range.value.marca;
    this.filters.modelo = this.range.value.modelo;
    this.filters.placa = this.range.value.placa;
    this.filters.orden = this.range.value.orden;
      console.log(this.filters)
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


