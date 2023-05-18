import { Component } from '@angular/core';
// import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  inForm!:boolean;

  // Para buscar a través de la ruta
  // constructor(private router: Router) {
  //   this.router.events.subscribe((event: Event) => {
  //     if(event instanceof NavigationStart){
  //       let path = event.url;
  //       console.log(event);
  //       if(path.match("/login") || path.match("/register")){
  //         this.inForm = true;
  //       }else{
  //         this.inForm = false;
  //       }
  //     }
  //   })
  // }

  //Buscar a través del componente
  onActivate(event: any): void {
    let component = event.constructor.name;
    if(component == "LoginComponent" || component == "RegisterComponent"){
      this.inForm = true;
    }else{
      this.inForm = false;
    }
  }
}
