import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FormBuilder, FormGroup, Validators, ValidationErrors } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  formLogin!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(){
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  submit(){
    if(this.formLogin.invalid){
      return;
    }

    // Si la validación funciona pasará el mensaje que nos de al componente modal para que los saque por pantalla.
    this.authService.sendLogin(this.formLogin.value)
    .subscribe((datos: any) => {
      if (datos['success'] == true) {
        this.authService.setToken(datos['token']);
        this.router.navigate(['/home']);
      } else {
        return console.log(datos);
      }
    });
  }

  redirectRegister(){
    this.router.navigate(['/register']);
  }
}
