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

  ngOnInit(){
    this.postService.getNotifications().subscribe((notifications: any) => {
      this.last_post_id = notifications[notifications.length - 1]["id"];
      this.notifications = notifications;
    });

  }
  
  reloadNotifications() {
    if (this.last_post_id == 0) {
      return console.log("No se puede avanzar más");
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

  redirect(username:string){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/profile/'+username]));
  }
}
