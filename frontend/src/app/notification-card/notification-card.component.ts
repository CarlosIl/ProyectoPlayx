import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent {
  @Input() noti: any;

  constructor(private router: Router) { }

  ngOnInit(){
    if(this.noti.profile_picture == null){
      this.noti.profile_picture = "../../assets/imgs/profile.jpg"
    }
  }

  // redirect(){
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
  //   this.router.navigate(['/profile/'+this.noti.username]));
  // }
}
