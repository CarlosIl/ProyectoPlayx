import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() post: any;
  constructor(private router: Router) { }

  goProfile() {
    this.router.navigate(['/profile/' + this.post.username]);
  }
}
