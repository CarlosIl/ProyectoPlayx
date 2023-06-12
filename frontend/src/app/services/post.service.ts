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
  //POSTS

  //Gets all posts
  retrievePosts() {
    return this.http.get(this.url + `/api/posts/home`, this.httpOptions);
  }

  //Gets all posts since a id
  reloadPosts(last_post_id: any) {
    return this.http.get(this.url + `/api/posts/home/` + last_post_id, this.httpOptions);
  }

  //Send data to create a new post
  sendPost(data: any) {
    return this.http.post(this.url + `/api/posts`, data, this.httpOptions2);
  }

  //Gets all posts from a specific user
  getPostsX(username: any) {
    return this.http.get(this.url + `/api/posts/profile/` + username, this.httpOptions);
  }

  //Gets all posts from a specific user since a id
  reloadPostsX(username: any, last_post_id: any) {
    return this.http.get(this.url + `/api/posts/profile/` + username + `/` + last_post_id, this.httpOptions);
  }

  //Retrieve all data from a specific post
  getPost(id: any) {
    return this.http.get(this.url + `/api/post/` + id, this.httpOptions);
  }

  //Retrieve all comments from a specific post
  getComments(id: any) {
    return this.http.get(this.url + `/api/comments/` + id, this.httpOptions);
  }

  //Retrieve all comments from a specific post since a id
  reloadComments(id: any, post_id: any) {
    return this.http.get(this.url + `/api/comments/` + id + `/` + post_id, this.httpOptions);
  }

  //USER

  //Retrieve current user data
  getMyUser() {
    return this.http.get(this.url + `/api/user`, this.httpOptions);
  }

  //Retrieve data from a specific user
  getOtherUser(username: any) {
    return this.http.get(this.url + `/api/userbox/` + username, this.httpOptions);
  }

  //Retrieve username and profile picture from all existing users
  getAllUsers() {
    return this.http.get(this.url + `/api/users/`, this.httpOptions);
  }

  //Send data to change  parameters of the current user
  changeUser(data: any) {
    return this.http.post(this.url + `/api/user`, data, this.httpOptions);
  }

  //Send image to change current user profile picture
  sendProfilePicture(data: any) {
    return this.http.post(this.url + `/api/profile_picture`, data, this.httpOptions2);
  }

  //Deletes current user account and images
  deleteMyUser() {
    return this.http.delete(this.url + `/api/user`, this.httpOptions);
  }

  //Retrieve data from a specific user
  getSpecificUser(id: any) {
    return this.http.get(this.url + `/api/user/` + id, this.httpOptions);
  }

  //Send data to change  parameters of the specific user
  changeSpecificUser(id: any, data: any) {
    return this.http.post(this.url + `/api/user/` + id, data, this.httpOptions);
  }

  //Deletes specific user account and images
  deleteUser(id: any) {
    return this.http.delete(this.url + `/api/user/` + id, this.httpOptions);
  }

  //Deletes current token session and deletes token from database
  logOut() {
    sessionStorage.removeItem('tokenAPI');
    return this.http.get(this.url + `/api/logout`, this.httpOptions);
  }

  //DEPRECATED
  //Retrieve profile picture URL from a specific user
  // getProfilePicture(username: any) {
  //   return this.http.get(this.url + `/api/profile/` + username, this.httpOptions);
  // }

  //DEPRECATED
  //Retrieve image URL from a specific post
  // retrieveImagePost(post_id: any) {
  //   return this.http.get(this.url + `/api/post/descargar/` + post_id, this.httpOptions);
  // }

  //FOLLOW

  //Creates a new follow row with another user
  follow(username: string) {
    return this.http.get(this.url + `/api/follow/` + username, this.httpOptions);
  }

  //Deletes a follow row
  unfollow(username: string) {
    return this.http.get(this.url + `/api/unfollow/` + username, this.httpOptions);
  }

  //Gets all posts from current user followings
  getPostsFollows() {
    return this.http.get(this.url + `/api/posts/follows/`, this.httpOptions);
  }

  //Gets all posts from current user followings since a id
  reloadPostsFollows(last_post_id: any) {
    return this.http.get(this.url + `/api/posts/follows/` + last_post_id, this.httpOptions);
  }

  //NOTIFICATIONS

  //Get all current user notifications
  getNotifications() {
    return this.http.get(this.url + `/api/notifications/`, this.httpOptions);
  }

  //Get all current user notifications since a id
  reloadNotifications(last_post_id: any) {
    return this.http.get(this.url + `/api/notifications/id/` + last_post_id, this.httpOptions);
  }

  //Mark notification as seen (status:1)
  seeingNofitication(id: any) {
    return this.http.get(this.url + `/api/notify/` + id, this.httpOptions);
  }

  //Retrieve the number of notifications not seen
  notSeenNotifications() {
    return this.http.get(this.url + `/api/notifications/not_seen`, this.httpOptions);
  }

  //LIKE

  //Add like to a specific post
  giveLike(id: any) {
    return this.http.get(this.url + `/api/like/` + id, this.httpOptions);
  }

  //Delete like to a specific post
  removeLike(id: any) {
    return this.http.get(this.url + `/api/unlike/` + id, this.httpOptions);
  }
}
