import { Component } from '@angular/core';

@Component({
  selector: 'app-post-final',
  templateUrl: './post-final.component.html',
  styleUrls: ['./post-final.component.scss']
})
export class PostFinalComponent {
  reloadPage(){
    window.location.reload();
  }
}
