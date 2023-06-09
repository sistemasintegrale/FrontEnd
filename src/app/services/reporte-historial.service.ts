import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { ReporteHistorialFilters } from '../interfaces/reporte-historial/reporte-historial-filters';
import { PaginationResponse } from '../interfaces/pagination-Response';
import { BaseResponse } from '../interfaces/base-Response';
import { ReporteHistorialResponse } from '../models/reporte-historial/reporte-historial-response';
import { Observable } from 'rxjs';

const base_url = environment.base_url;
const service = environment.CONN_NOVAGLASS;

@Injectable({
  providedIn: 'root'
})
export class ReporteHistorialService {

  constructor(private http: HttpClient) { }

  cargarReporteHistorial( filters : ReporteHistorialFilters) : Observable<PaginationResponse<BaseResponse<ReporteHistorialResponse[]>>>{
    return this.http.post<PaginationResponse<BaseResponse<ReporteHistorialResponse[]>>>(`${base_url}/Reporte/${service}`,filters);
  }

   
}
