import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from "@angular/forms";
import { PostService } from '../../../services/post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CreatedValidations } from "../../../auth/created-validations";
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from "../../../modal/modal.component";

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss'],
  providers: [CreatedValidations]
})
export class ModifyComponent {

  id!: string;

  formUserProfile!: FormGroup;

  username!: string;
  firstName!: string;
  lastName!: string;
  email!: string;

  formProfilePicture!: FormGroup;
  filedata: any;
  imagePreview!: string;

  constructor(private activatedRoute: ActivatedRoute ,private postService: PostService, private fb: FormBuilder, public smPass: CreatedValidations, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.postService.getMyUser().subscribe((datos: any) => {
      var userx = datos['user']
      if(userx['type'] == 1){
        this.activatedRoute.paramMap.subscribe((parametro: ParamMap) => {
          this.id = parametro.get("id")!;
        })
    
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
    
        this.postService.getSpecificUser(this.id).subscribe((datos: any) => {
          var user = datos['user'];
    
          this.username = user['username'];
          this.email = user['email'];
          if (user['firstName'] != null) {
            this.firstName = user['firstName'];
          }
    
          if (user['lastName'] != null) {
            this.lastName = user['lastName'];
          }
        });
      }else{
        window.stop();

        const dialogRef = this.dialog.open(ModalComponent, {
          width: '400px',
          data: {
            message: "You are not allowed in this page. Admins only!",
            action: "Go to home",
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          //If the user click the action button executes these lines
          if (result == true) {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/home']));
          }
          console.log('Modal cerrado');
          // history.back();
        });

      }
    });
  }

  submitUserProfile() {
    if (this.formUserProfile.invalid) {
      return console.log(this.formUserProfile.invalid);
    }

    this.postService.changeSpecificUser(this.id, this.formUserProfile.value)
    .subscribe((datos: any) => {
      if (datos['success'] == true) {
        // window.location.reload();
        return console.log(datos);
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
}
