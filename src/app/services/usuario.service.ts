import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { environment } from 'src/environments/environments';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { BaseResponse } from '../auth/interfaces/base-Response';
import { UsuarioData } from '../models/usuarios/usuarioData';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) { }

  public usuario! : UsuarioData;

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuario`, formData);
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
