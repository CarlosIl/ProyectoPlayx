import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url:string = 'http://localhost:8000';

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.authService.getToken(),
    })
  }

  constructor(private http: HttpClient, private authService: AuthService) { }

  retrievePosts(){
    return this.http.get(this.url+`/api/posts`, this.httpOptions);
  }

  getUser(){
    return this.http.get(this.url+`/api/user`, this.httpOptions);
  }

  logOut(){
    return this.http.get(this.url+`/api/logout`, this.httpOptions);
  }

  getProfilePicture(username: any){
    return this.http.get(this.url+`/api/profile/`+username, this.httpOptions);
  }

  retrieveImagePost(post_id: any){
    return this.http.get(this.url+`/api/post/descargar/`+post_id, this.httpOptions);
  }
}
