import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FormBuilder, FormGroup, Validators, ValidationErrors } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formRegister!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(){
    this.formRegister = this.fb.group({
      username: ['', [Validators.required]],
      firstName: ['', [Validators.nullValidator]],
      lastName: ['', [Validators.nullValidator]],
      // profile_picture: ['', [Validators.nullValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      c_password: ['', [Validators.required]]
    })
  }

  submit(){
    if(this.formRegister.invalid){
      return;
    }

    // Si la validación funciona pasará el mensaje que nos de al componente modal para que los saque por pantalla.
    this.authService.sendRegister(this.formRegister.value)
    .subscribe((datos: any) => {
      if (datos['success'] == true) {
        this.router.navigate(['/login']);
      } else {
        return console.log(datos);
      }
    });
  }

  redirectLogin(){
    this.router.navigate(['/login']);
  }
}