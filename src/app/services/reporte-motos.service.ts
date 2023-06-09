import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReporteHistorialFilters } from '../interfaces/reporte-historial/reporte-historial-filters';
import { PaginationResponse } from '../interfaces/pagination-Response';
import { BaseResponse } from '../interfaces/base-Response';
import { ReporteHistorialResponse } from '../models/reporte-historial/reporte-historial-response';
import { environment } from 'src/environments/environments';

const base_url = environment.base_url;
const service = environment.CONN_NOVAMOTOS;
@Injectable({
  providedIn: 'root'
})
export class ReporteMotosService {

  constructor(private http: HttpClient) { }

  cargarReporteHistorial( filters : ReporteHistorialFilters) : Observable<PaginationResponse<BaseResponse<ReporteHistorialResponse[]>>>{
    return this.http.post<PaginationResponse<BaseResponse<ReporteHistorialResponse[]>>>(`${base_url}/Reporte/${service}`,filters);
  }
}
