import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() username: string = ""
  @Input() profile_picture: string = ""
  @Input() firstName: string = ""
  @Input() lastName: string = ""
  @Input() followers: string = ""
  @Input() followings: string = ""
  @Input() MyUser: boolean = false;
  @Input() Following: any;

  constructor(private postService: PostService, private router: Router) { }

  goEditProfile() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/edit_profile']));
  }

  follow() {
    this.postService.follow(this.username).subscribe((datos:any) => {
      if (datos['success'] == true) {
        window.location.reload();
      } else {
        return console.log(datos);
      }
    })
  }

  unfollow() {
    this.postService.unfollow(this.username).subscribe((datos:any) => {
      if (datos['success'] == true) {
        window.location.reload();
      } else {
        return console.log(datos);
      }
    })
  }
}
