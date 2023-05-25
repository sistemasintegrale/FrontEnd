import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/usuario/register-form.interface';
import { environment } from 'src/environments/environments';
import { LoginForm } from '../interfaces/usuario/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { BaseResponse } from '../interfaces/base-Response';
import { UsuarioData } from '../models/usuarios/usuarioData';
import { PaginationResponse } from '../interfaces/pagination-Response';
import { UsuarioFilters } from '../interfaces/usuario/filters';
import { UsuarioCreate } from '../models/usuarios/usuarioCreate';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) { }

  public usuario! : UsuarioData;

  cargarUsuarios( filters : UsuarioFilters) : Observable<PaginationResponse<BaseResponse<UsuarioData[]>>>{
    return this.http.post<PaginationResponse<BaseResponse<UsuarioData[]>>>(`${base_url}/usuario/getAll`,filters);
  }

  crearUsuario(formData: RegisterForm) : Observable<BaseResponse<UsuarioData>> {

    return this.http.post<BaseResponse<UsuarioData>>(`${base_url}/usuario`, formData);
  }

  getUsuario(id:number) : Observable<BaseResponse<UsuarioData>> {
    return this.http.get<BaseResponse<UsuarioData>>(`${base_url}/usuario/${id}`);
  }

  modificarUsuario(formData: RegisterForm, id : number) : Observable<BaseResponse<UsuarioData>> {
    debugger
    const {nombre,apellidos,email,password,estado} = formData;
    const valueEstado = String(estado) === 'true' ? 1:0;
    const usuarioEdit = new UsuarioCreate(nombre,apellidos,email,password,Boolean(valueEstado));
    return this.http.put<BaseResponse<UsuarioData>>(`${base_url}/usuario/${id}`, usuarioEdit);
  }
  eliminarUsuario(usuario : UsuarioData):Observable<boolean>{
    return this.http.delete<boolean>(`${base_url}/usuario/${usuario.id}`);
  }

  login(formData: LoginForm): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${base_url}/usuario/generate/token`, formData)
      .pipe(
        tap((resp ) => {
          if (resp.isSucces) {

            localStorage.setItem('token', resp.data);
          }
        }));
  }

  getToken(){
    return  localStorage.getItem('token');
  }

  validarToken() : Observable<boolean>{
    return this.http.get(`${base_url}/usuario/validarToken`)
    .pipe(
      tap((resp : any) => {
        if (resp.isSucces) {
          this.usuario = resp.data;
          localStorage.setItem('token', resp.data.token);
        }
      }),
      map(resp => true),
      catchError(error => of(false) )
      );
  }

  logOut(){
    localStorage.removeItem('token');
  }


}
