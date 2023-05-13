import { Component } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  posts!: any;

  constructor(private postService: PostService) {}

  ngOnInit(){
    this.postService.retrievePosts()
      .subscribe(result => this.posts = result)
  }

  retrievePosts(){
    return JSON.stringify(this.posts);
  }
}
