import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = 'http://localhost:8000';

  httpOptions1 = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  sendRegister(data: any){
    return this.http.post(this.url+`/api/register`, data, this.httpOptions1);
  }

  sendLogin(data: any){
    return this.http.post(this.url+`/api/login`, data, this.httpOptions1);
  }

  //sessionStorage guarda el token automáticamente mientras que localStorage necesita recargar la página
  setToken(token:string){
    sessionStorage.setItem('tokenAPI', token);
  }

  getToken(): string | null{
    let token = sessionStorage.getItem('tokenAPI');
    return token;
  }

}
