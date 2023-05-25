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
  //Array with all user data
  @Input() user: any;
  //Boolean specify if is the current user or not
  @Input() MyUser: boolean = false;

  constructor(private postService: PostService, private router: Router) { }

  //Redirect to edit-profile component with reload
  goEditProfile() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/edit_profile']));
  }

  //Method to follow a user and automatically change the button to unfollow
  follow() {
    this.postService.follow(this.username).subscribe((datos:any) => {
      if (datos['success'] == true) {
        //One second to wait so that there are no problems with the counter.
        setTimeout(() => {
          this.user.followers += 1;
          this.user.user_follow = 1;
        }, 1000);
      } else {
        return console.log(datos);
      }
    })
  }

  //Method to unfollow a user and automatically change the button to follow
  unfollow() {
    this.postService.unfollow(this.username).subscribe((datos:any) => {
      if (datos['success'] == true) {
        setTimeout(() => {
          this.user.followers -= 1;
          this.user.user_follow = 0;
        });
      } else {
        return console.log(datos);
      }
    })
  }
}
