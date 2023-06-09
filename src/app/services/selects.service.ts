import { Marca } from './../interfaces/reporte-historial/marca';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { BaseResponse } from '../interfaces/base-Response';
import { Modelo } from '../interfaces/reporte-historial/modelo';
import { Placa } from '../interfaces/reporte-historial/placa';
import { OrdenReparacion } from '../interfaces/reporte-historial/OR';
import { ReporteHistorialFilters } from '../interfaces/reporte-historial/reporte-historial-filters';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SelectsService {

  constructor(private http: HttpClient) { }

  cargarSelectMarca(service : number,filters : ReporteHistorialFilters):Observable<BaseResponse<Marca[]>>{
    return this.http.post<BaseResponse<Marca[]>>(`${base_url}/Reporte/marcas/${service}`,filters);
  }

  cargarSelectModelo(service : number,filters : ReporteHistorialFilters):Observable<BaseResponse<Modelo[]>>{
    return this.http.post<BaseResponse<Modelo[]>>(`${base_url}/Reporte/modelos/${service}`,filters);
  }

  cargarSelectPlaca(service : number,filters : ReporteHistorialFilters):Observable<BaseResponse<Placa[]>>{
    return this.http.post<BaseResponse<Placa[]>>(`${base_url}/Reporte/placas/${service}`,filters);
  }

  cargarSelectOR(service : number,filters : ReporteHistorialFilters):Observable<BaseResponse<OrdenReparacion[]>>{
    return this.http.post<BaseResponse<OrdenReparacion[]>>(`${base_url}/Reporte/or/${service}`,filters);
  }
}
