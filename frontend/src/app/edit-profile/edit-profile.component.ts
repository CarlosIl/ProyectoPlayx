import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from "@angular/forms";
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  formUserProfile!: FormGroup;

  username!: string;
  firstName!: string;
  lastName!: string;
  email!: string;

  formProfilePicture!: FormGroup;
  filedata: any;

  constructor(private postService: PostService, private fb: FormBuilder) { }

  ngOnInit() {
    this.formUserProfile = this.fb.group({
      username: ['', [Validators.nullValidator]],
      firstName: ['', [Validators.nullValidator]],
      lastName: ['', [Validators.nullValidator]],
      email: ['', [Validators.nullValidator, Validators.email]],
      password: ['', [Validators.nullValidator, Validators.minLength(8)]],
      c_password: ['', [Validators.nullValidator, Validators.minLength(8)]]
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
    });
  }

  fileEvent(e: any) {
    this.filedata = e.target.files[0];
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
    });
  }
}
