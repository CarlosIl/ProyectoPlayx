import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  username!: any;
  profile!: any;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.postService.getMyUser().subscribe((datos: any) => {
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

  goProfile() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/profile/' + this.username]));
  }
}
