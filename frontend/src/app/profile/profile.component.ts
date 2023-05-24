import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../services/post.service';

import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private dialog: MatDialog) { }
  /**
   * For user-card component
   */
  // Parameter taken from the route
  username!: string;
  // Retrieve user information in an array
  user!: any;
  //Boolean specify if is the current user or not
  MyUser!: boolean;

  /**
   * For post-card component and infinite-scroll
   */
  // Array with all the posts retrieved
  posts!: any;
  // ID from the last post retrieved
  last_post_id!: number;
  //Boolean says if is the last post or not 
  final: boolean = false;
  //Boolean says if there aren't any posts from this profile
  nada: boolean = false;
  //Message for post-final component in case nada is true
  message!: string;

  ngOnInit() {
    //Retrieve username from the URL
    this.activatedRoute.paramMap.subscribe((parametro: ParamMap) => {
      this.username = parametro.get("username")!;
    })

    
    this.postService.getOtherUser(this.username).subscribe((datos: any) => {
      this.user = datos[0];
      if (!this.user) {
        const dialogRef = this.dialog.open(ModalComponent, {
          width: '400px',
          data: {
            title: 'Mi modal',
            message: 'Este es un ejemplo de modal utilizando Angular y Material Design.'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('Modal cerrado');
        });
      } else {

        if (this.username == this.user['myUsername']) {
          this.MyUser = true;
        } else {
          this.MyUser = false;
        }

        this.postService.getPostsX(this.username).subscribe((posts: any) => {
          if (posts.length == 0) {
            this.nada = true;
            this.message = "You didn´t write any posts yet";
          } else {
            this.last_post_id = posts[posts.length - 1]["id"];
            this.posts = posts;
          }
        });
      }
    })
  }

  reloadPosts() {
    if (this.last_post_id == 1) {
      this.final = true;
    } else {
      this.postService.reloadPostsX(this.username, this.last_post_id).subscribe((posts: any) => {
        for (let index = 0; index < posts.length; index++) {
          this.posts.push(posts[index]);
        }

        if (posts.length == 0) {
          this.final = true;
        } else {
          this.last_post_id = posts[posts.length - 1]["id"];
        }
      })
    }
  }

}
