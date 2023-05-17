import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  inForm!:boolean;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationStart){
        let path = event.url;
        if(path.match("/login")  || path.match("/register") ){
          this.inForm = true;
        }else{
          this.inForm = false;
        }
      }
    })
  }
}
