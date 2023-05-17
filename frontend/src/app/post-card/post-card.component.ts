import { Component, Input } from '@angular/core';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() id: string = ""
  @Input() username: string = ""
  @Input() profile_picture: any
  @Input() post: string = ""
  @Input() file_name: string = ""
  @Input() created_at: string = ""
  image!: string;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    if (this.profile_picture == null) {
      this.profile_picture = "../../assets/imgs/profile.jpg"
    } else {
      this.postService.getProfilePicture(this.username).subscribe((baseImage: any) => {
        this.profile_picture = baseImage.url;
      })
    }

    if (this.file_name != null) {
      this.postService.retrieveImagePost(this.id).subscribe((image: any) => {
        this.image = image.url;
      })
    }
  }

  goProfile() {
    this.router.navigate(['/profile/' + this.username]);
  }
}
