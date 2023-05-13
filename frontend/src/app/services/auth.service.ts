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

  httpOptions2 = {
    headers : new HttpHeaders({
      'Content-Type':'multipart/form-data'
    })
  }

  constructor(private http: HttpClient) { }

  sendRegister(data: any){
    return this.http.post(this.url+`/api/register`, data, this.httpOptions1);
  }

  sendProfilePicture(data: any){
    return this.http.post(this.url+`/api/register`, data, this.httpOptions2);
  }

  sendLogin(data: any){
    return this.http.post(this.url+`/api/login`, data, this.httpOptions1);
  }

  setToken(token:string){
    localStorage.setItem('tokenAPI', token);
  }

  getToken(): string | null{
    let token = localStorage.getItem('tokenAPI');
    return token;
  }

}
