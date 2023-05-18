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
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToken(),
      'enctype': 'multipart/form-data',
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

  logOut() {
    return this.http.get(this.url + `/api/logout`, this.httpOptions);
  }

  getProfilePicture(username: any) {
    return this.http.get(this.url + `/api/profile/` + username, this.httpOptions);
  }

  retrieveImagePost(post_id: any) {
    return this.http.get(this.url + `/api/post/descargar/` + post_id, this.httpOptions);
  }

  // sendPost(data: any, filedata: any) {
  //   let myFormData = new FormData();
  //   myFormData.append("post", data.post);
  //   myFormData.append("post_file", filedata);

  //   var request = new XMLHttpRequest();
  //   request.open("POST", this.url+`/api/posts`);
  //   request.send(myFormData);

  // let array = [
  //   {
  //     "post": post,
  //   }
  // ];
  // console.log(array[0]);
  // return this.http.post(this.url+`/api/posts`, array[0], this.httpOptions);
  // let post_id = response;
  // console.log(post_id);
  // return this.http.post(this.url+`/api/posts/image/`+post_id, myFormData, this.httpOptions2);
  sendPost(data: any) {
    return this.http.post(this.url + `/api/posts`, data, this.httpOptions);
  }

  getPostsX(username:any){
    return this.http.get(this.url + `/api/posts/profile/` + username, this.httpOptions);
  }

  reloadPostsX(username:any, last_post_id: any){
    return this.http.get(this.url + `/api/posts/profile/` + username + `/` + last_post_id, this.httpOptions);
  }
}
