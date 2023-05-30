import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FormBuilder, FormGroup, Validators, ValidationErrors } from "@angular/forms";
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from "../../modal/modal.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  submit() {
    if (this.formLogin.invalid) {
      return console.log(this.formLogin);
    }

    // Si la validación funciona pasará el mensaje que nos de al componente modal para que los saque por pantalla.
    this.authService.sendLogin(this.formLogin.value)
      .subscribe((datos: any) => {
        if (datos['success'] == true) {
          this.authService.setToken(datos['token']);
          this.router.navigate(['/home']);
          //Hay que recargar para qe el backend pille correctamente el token y no nos de error de autentificación
          //Hay que esperar para recargar la página para que no nos rediriga a login otra vez 
          setTimeout(() => {
            window.location.reload();
          }, 500);

        } else {
          return console.log(datos);
        }
      }, (err: any) => {
        console.log(err)
        let error_message;
        let action;
        
        //No connection to backend server
        if (err.statusText == "Unknown Error") {
          error_message = "Can't connect to server";
          action = "Try again";
        } else{
          error_message = err.error.message;
        }

        const dialogRef = this.dialog.open(ModalComponent, {
          width: '400px',
          data: {
            message: error_message,
            action: action,
          }
        });
  
        dialogRef.afterClosed().subscribe(result => {
          if (result == true) {
            this.submit();
          }
        });
      });
  }

  //Redirects to register page
  redirectRegister() {
    this.router.navigate(['/register']);
  }
}
