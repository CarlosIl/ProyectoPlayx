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
  constructor(private router: Router, private postService: PostService) {}

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
}
