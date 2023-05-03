import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = 'http://localhost:8000';

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  sendRegister(data: any){
    return this.http.post(this.url+`/api/register`, data, this.httpOptions);
  }

  sendLogin(data: any){
    return this.http.post(this.url+`/api/login`, data, this.httpOptions);
  }

}
