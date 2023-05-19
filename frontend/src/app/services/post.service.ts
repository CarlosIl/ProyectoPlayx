import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url: string = 'http://localhost:8000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToken(),
    })
  }

  httpOptions2 = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.getToken(),
    })
  }

  constructor(private http: HttpClient, private authService: AuthService) { }

  retrievePosts() {
    return this.http.get(this.url + `/api/posts/home`, this.httpOptions);
  }

  reloadPosts(last_post_id: any) {
    return this.http.get(this.url + `/api/posts/home/` + last_post_id, this.httpOptions);
  }

  getMyUser() {
    return this.http.get(this.url + `/api/user`, this.httpOptions);
  }

  getOtherUser(username: any) {
    return this.http.get(this.url + `/api/user/` + username, this.httpOptions);
  }

  getAllUsers(){
    return this.http.get(this.url + `/api/users/`, this.httpOptions);
  }

  changeUser(data: any) {
    return this.http.post(this.url + `/api/user`, data, this.httpOptions);
  }
  
  sendProfilePicture(data: any){
    return this.http.post(this.url+`/api/profile_picture`, data, this.httpOptions2);
  }

  logOut() {
    sessionStorage.removeItem('tokenAPI');
    return this.http.get(this.url + `/api/logout`, this.httpOptions);
  }

  getProfilePicture(username: any) {
    return this.http.get(this.url + `/api/profile/` + username, this.httpOptions);
  }

  retrieveImagePost(post_id: any) {
    return this.http.get(this.url + `/api/post/descargar/` + post_id, this.httpOptions);
  }

  sendPost(data: any) {
    return this.http.post(this.url + `/api/posts`, data, this.httpOptions2);
  }

  getPostsX(username:any){
    return this.http.get(this.url + `/api/posts/profile/` + username, this.httpOptions);
  }

  reloadPostsX(username:any, last_post_id: any){
    return this.http.get(this.url + `/api/posts/profile/` + username + `/` + last_post_id, this.httpOptions);
  }
}
