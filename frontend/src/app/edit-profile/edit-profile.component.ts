import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from "@angular/forms";
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { CreatedValidations } from "../auth/created-validations";
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [CreatedValidations]
})
export class EditProfileComponent {

  formUserProfile!: FormGroup;

  username!: string;
  firstName!: string;
  lastName!: string;
  email!: string;

  formProfilePicture!: FormGroup;
  filedata: any;
  imagePreview!: string;

  constructor(private postService: PostService, private fb: FormBuilder, private router: Router, public smPass: CreatedValidations, private dialog: MatDialog) { }

  ngOnInit() {
    this.formUserProfile = this.fb.group({
      username: ['', [Validators.nullValidator]],
      firstName: ['', [Validators.nullValidator]],
      lastName: ['', [Validators.nullValidator]],
      email: ['', [Validators.nullValidator, Validators.email]],
      password: ['', [Validators.nullValidator, Validators.minLength(8)]],
      c_password: ['', [Validators.nullValidator]]
    }, {
      validator: this.smPass.samePassword('password', 'c_password')
    })

    this.formProfilePicture = this.fb.group({
      profile_picture: ['', [Validators.required]]
    })

    this.postService.getMyUser().subscribe((datos: any) => {
      var user = datos['user'];

      this.username = user['username'];
      this.email = user['email'];
      if (user['firstName'] != null) {
        this.firstName = user['firstName'];
      }

      if (user['lastName'] != null) {
        this.lastName = user['lastName'];
      }

      // this.formUserProfile.setValue({
      //   username: user['username'],
      //   firstName: user['firstName'],
      //   lastName: user['lastName'],
      //   email: user['email'],
      //   password: '',
      //   c_password: '',
      // })
    });
  }

  submitUserProfile() {
    if (this.formUserProfile.invalid) {
      return console.log(this.formUserProfile.invalid);
    }

    this.postService.changeUser(this.formUserProfile.value)
    .subscribe((datos: any) => {
      if (datos['success'] == true) {
        window.location.reload();
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
            this.submitUserProfile();
          }
        });
    });
  }

  fileEvent(e: any) {
    this.filedata = e.target.files[0];
    if (this.filedata.type.includes('image/')) {
      let reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      }
      reader.readAsDataURL(this.filedata);
    }
  }

  submitProfilePicture(){
    if (this.formProfilePicture.invalid) {
      return console.log(this.formProfilePicture.invalid);
    }

    let formData = new FormData();
    formData.append("profile_picture", this.filedata, this.filedata.name);
    this.postService.sendProfilePicture(formData).subscribe((datos:any) => {
      if (datos['success'] == true) {
        window.location.reload();
      } else {
        return console.log(datos);
      }
    }, (err: any) => {
      console.log(err)
      let error_message;
      let action

      //No connection to backend server
      if (err.statusText == "Unknown Error") {
        error_message = "Can't connect to server. Please wait some minutes and try again";
        action = "Try again";
      //No connection with database
      //Post_file must be a image
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
          this.submitProfilePicture();
        }
      });
    });
  }

  deleteUser(){
    this.postService.deleteMyUser().subscribe((datos:any) => {
      if (datos['success'] == true) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/login']));
      } else {
        return console.log(datos);
      }
    })
  }
}
