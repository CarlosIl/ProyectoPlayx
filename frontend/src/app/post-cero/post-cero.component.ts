import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-cero',
  templateUrl: './post-cero.component.html',
  styleUrls: ['./post-cero.component.scss']
})
export class PostCeroComponent {
  @Input() message: string = ""
}
