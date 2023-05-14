import { Component } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  username!: any;
  profile!: any;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getUser().subscribe((datos: any) => {
      var user = datos['user']
      this.username = user['username'];
      if (user['profile_picture'] == null) {
        this.profile = "../../assets/imgs/profile.jpg"
      } else {
        // this.profile = user['profile_picture'];
        this.postService.getProfilePicture(this.username).subscribe((baseImage: any) => {
          this.profile = baseImage.url;
        })
      }
    })
  }
}
