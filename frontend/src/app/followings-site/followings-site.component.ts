import { Component } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-followings-site',
  templateUrl: './followings-site.component.html',
  styleUrls: ['./followings-site.component.scss']
})
export class FollowingsSiteComponent {
  posts!: any;
  last_post_id!: any;
  array_profile_pictures!:any ;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.retrievePosts().subscribe((posts: any) => {
      if(posts.length<=1){
        console.log("no hay más posts");
      }
      this.last_post_id = posts[posts.length-1]["id"];
      this.posts = posts;
    })
  }

  reloadPosts() {
    if(this.last_post_id == 1){
      return console.log("No se puede avanzar más");
    }else{
      this.postService.reloadPosts(this.last_post_id).subscribe((posts: any) => {
        for (let index = 0; index < posts.length; index++) {
          this.posts.push(posts[index]);
        }
        if(posts.length<=1){
          console.log("no hay más posts");
        }
        this.last_post_id = posts[posts.length-1]["id"];
      })
    }
  }
}
