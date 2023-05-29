import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-followings-site',
  templateUrl: './followings-site.component.html',
  styleUrls: ['./followings-site.component.scss']
})
export class FollowingsSiteComponent {
  posts!: any;
  last_post_id!: any;
  array_profile_pictures!:any ;

  final:boolean = false;
  nada:boolean = false;
  message!:string;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.postService.getPostsFollows().subscribe((posts: any) => {
      if(posts.length==0){
        this.nada = true;
        this.message = "You didn´t follow any users yet";
      }else{
        this.last_post_id = posts[posts.length-1]["id"];
        this.posts = posts;
      }
    })
  }

  reloadPosts() {
    if(this.last_post_id == 1){
      this.final = true;
    }else{
      this.postService.reloadPostsFollows(this.last_post_id).subscribe((posts: any) => {
        for (let index = 0; index < posts.length; index++) {
          this.posts.push(posts[index]);
        }
        
        if (posts.length == 0 && this.nada!=true) {
          this.final = true;
          // console.log("No hay más posts")
        } else {
          this.last_post_id = posts[posts.length - 1]["id"];
        }
      })
    }
  }

  redirectCreatePost() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/create']));
  }
}
