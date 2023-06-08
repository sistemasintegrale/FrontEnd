import { Marca } from './../interfaces/reporte-historial/marca';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { BaseResponse } from '../interfaces/base-Response';
import { Modelo } from '../interfaces/reporte-historial/modelo';
import { Placa } from '../interfaces/reporte-historial/placa';
import { OrdenReparacion } from '../interfaces/reporte-historial/OR';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SelectsService {

  constructor(private http: HttpClient) { }

  cargarSelectMarca(service : number):Observable<BaseResponse<Marca[]>>{
    return this.http.get<BaseResponse<Marca[]>>(`${base_url}/Reporte/marcas/${service}`);
  }

  cargarSelectModelo(service : number):Observable<BaseResponse<Modelo[]>>{
    return this.http.get<BaseResponse<Modelo[]>>(`${base_url}/Reporte/modelos/${service}`);
  }

  cargarSelectPlaca(service : number):Observable<BaseResponse<Placa[]>>{
    return this.http.get<BaseResponse<Placa[]>>(`${base_url}/Reporte/placas/${service}`);
  }

  cargarSelectOR(service : number):Observable<BaseResponse<OrdenReparacion[]>>{
    return this.http.get<BaseResponse<OrdenReparacion[]>>(`${base_url}/Reporte/or/${service}`);
  }
}
