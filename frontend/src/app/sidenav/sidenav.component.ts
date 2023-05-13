import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(private postService: PostService, private router: Router) {}

  logOut(){
    this.postService.logOut().subscribe();
    this.router.navigate(['/login']);
  }
}
