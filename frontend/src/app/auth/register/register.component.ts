import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from "@angular/forms";
import { Router } from '@angular/router';
import { CreatedValidations } from "../created-validations";
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from "../../modal/modal.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [CreatedValidations]
})
export class RegisterComponent {

  formRegister!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, public smPass: CreatedValidations, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.formRegister = this.fb.group({
      username: ['', [Validators.required]],
      firstName: ['', [Validators.nullValidator]],
      lastName: ['', [Validators.nullValidator]],
      // profile_picture: ['', [Validators.nullValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      c_password: ['', [Validators.required]]
    }, {
      validator: this.smPass.samePassword('password', 'c_password')
    });
  }

  submit() {
    if (this.formRegister.invalid) {
      return console.log(this.formRegister);
    }

    // Si la validación funciona pasará el mensaje que nos de al componente modal para que los saque por pantalla.
    this.authService.sendRegister(this.formRegister.value)
      .subscribe((datos: any) => {
        if (datos['success'] == true) {
          // this.router.navigate(['/login']);
          const dialogRef = this.dialog.open(ModalComponent, {
            width: '400px',
            data: {
              message: "We have send you a mail to the email you give us. Open the link to verify your account.",
              good: true,
            }
          });
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
        //No connection with database
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

  redirectLogin() {
    this.router.navigate(['/login']);
  }
}
