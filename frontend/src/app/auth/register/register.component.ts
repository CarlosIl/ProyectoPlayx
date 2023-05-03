import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FormBuilder, FormGroup, Validators, ValidationErrors } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formRegister!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(){
    this.formRegister = this.fb.group({
      username: ['', [Validators.required]],
      firstName: ['', [Validators.nullValidator]],
      lastName: ['', [Validators.nullValidator]],
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
        return console.log(datos);
      } else {
        return console.log(datos);
      }
    });
  }
}
