import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() post: any;
  @Input() isComment: boolean = false;
  comment_post!:any;

  like: boolean = false;
  constructor(private router: Router, private postService: PostService) {}

  ngOnInit(){
    if(this.post?.user_like == 1){
      this.like = true;
    }
  }

  ngAfterViewInit(){
    setTimeout(() => {
      if(this.post?.comment_id!=null){
        this.postService.getPost(this.post.comment_id).subscribe((post:any) => {
          this.comment_post = post[0];
        })
      }
    }, 1000)
  }

  goProfile() {
    this.router.navigate(['/profile/' + this.post.username]);
  }

  redirectCommented(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/post/' + this.post.comment_id]));
  }

  giveLike(){
    this.postService.giveLike(this.post.id).subscribe((datos:any) => {
      if (datos['success'] == true) {
        this.post.likes = this.post.likes+1;
        this.like = true;
        return console.log("Se ha dado like");
      } else {
        return console.log(datos);
      }
    })
  }

  removeLike(){
    this.postService.removeLike(this.post.id).subscribe((datos:any) => {
      if (datos['success'] == true) {
        this.post.likes = this.post.likes-1;
        this.like = false;
        return console.log("Se ha removido el like");
      } else {
        return console.log(datos);
      }
    })
  }
}
