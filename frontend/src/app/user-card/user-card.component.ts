import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  goEditProfile() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/edit_profile']));
  }

  follow() {
    console.log("follow");
  }
}
