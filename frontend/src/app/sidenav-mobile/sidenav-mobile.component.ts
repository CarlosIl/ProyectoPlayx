import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-sidenav-mobile',
  templateUrl: './sidenav-mobile.component.html',
  styleUrls: ['./sidenav-mobile.component.scss']
})
export class SidenavMobileComponent {
  constructor(private postService: PostService, private router: Router) { }
  not_seen!:any;
  notifications!: any;
  last_noti_id!: any;

  final:boolean = false;

  ngOnInit(){
    this.postService.notSeenNotifications().subscribe((not_seen: any) => {
      if(not_seen!=0){
        this.not_seen = not_seen;
      }
    })
  }

  getNotifications(){
    this.postService.getNotifications().subscribe((notifications: any) => {
      if (notifications.length == 0) {
        this.final = true;
        console.log("No hay más notifications")
      } else {
        this.last_noti_id = notifications[notifications.length - 1]["id"];
        this.notifications = notifications;
      }
    });
  }
  
  reloadNotifications() {
    if (this.last_noti_id == 1) {
      this.final = true;
      return console.log("No se puede avanzar más");
    } else {
      this.postService.reloadNotifications(this.last_noti_id).subscribe((notifications: any) => {
        for (let index = 0; index < notifications.length; index++) {
          this.notifications.push(notifications[index]);
        }

        if (notifications.length == 0) {
          this.final = true;
          console.log("No hay más notifications")
        } else {
          this.last_noti_id = notifications[notifications.length - 1]["id"];
        }
      })
    }
  }

  seeing_redirect(username:string, id:number){
    this.postService.seeingNofitication(id).subscribe((datos:any) => {
      if (datos['success'] == true) {

        if(this.not_seen == 1){
          delete(this.not_seen);
        }else{
          this.not_seen -= 1;
        }    

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/profile/'+username]));
      } else {
        return console.log(datos);
      }
    })
  }
}
