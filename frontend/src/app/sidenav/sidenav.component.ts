import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(private postService: PostService, private router: Router) { }
  notifications!: any;
  last_post_id!: any;

  final:boolean = false;

  getNotifications(){
    this.postService.getNotifications().subscribe((notifications: any) => {
      this.last_post_id = notifications[notifications.length - 1]["id"];
      this.notifications = notifications;
    });
  }
  
  reloadNotifications() {
    if (this.last_post_id == 1) {
      this.final = true;
      // return console.log("No se puede avanzar más");
    } else {
      this.postService.reloadNotifications(this.last_post_id).subscribe((posts: any) => {
        for (let index = 0; index < posts.length; index++) {
          this.notifications.push(posts[index]);
        }

        if (posts.length == 0) {
          this.final = true;
          // console.log("No hay más posts")
        } else {
          this.last_post_id = posts[posts.length - 1]["id"];
        }
      })
    }
  }

  logOut() {
    this.postService.logOut().subscribe();
    this.router.navigate(['/login']);
  }

  seeing_redirect(username:string, id:number){
    this.postService.seeingNofitication(id).subscribe((datos:any) => {
      if (datos['success'] == true) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/profile/'+username]));
      } else {
        return console.log(datos);
      }
    })
  }
}
