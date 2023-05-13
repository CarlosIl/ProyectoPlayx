import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() id:string=""
  @Input() user_id:string=""
  @Input() post:string=""
  @Input() created_at:string=""
}
