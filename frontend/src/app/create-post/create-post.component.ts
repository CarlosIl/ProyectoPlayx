import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from "@angular/forms";
import { PostService } from '../services/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CreatedValidations } from "../auth/created-validations";
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  providers: [CreatedValidations]
})
export class CreatePostComponent {

  @Input() comment_id!:string;
  formPost!: FormGroup;
  filedata: any;
  imagePreview!: string;
  isImage:boolean = false;

  constructor(private fb: FormBuilder, private postService: PostService, private activatedRoute: ActivatedRoute, public ownVald: CreatedValidations, private dialog: MatDialog) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((parametro: ParamMap) => {
      if(parametro!=null){
        this.comment_id = parametro.get("id")!;
      }
    })

    this.formPost = this.fb.group({
      post: ['', [Validators.nullValidator]],
      post_file: ['', [Validators.nullValidator]]
    }, {
      validator: this.ownVald.atLeastOne('post','post_file')
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
      this.isImage == true;
    }
  }

  submit() {
    if(this.formPost.value.post == "" && this.formPost.value.post_file != ""){
    }else{
      if (this.formPost.invalid) {
        let error_message;
        if(this.formPost.errors?["atLeastOne"]:Boolean){
          error_message = "You must filled at least a text or a image to post it";
        }
        const dialogRef = this.dialog.open(ModalComponent, {
          width: '400px',
          data: {
            message: error_message,
          }
        });
        return console.log(this.formPost.errors);
      }
    }

    let formData = new FormData();
    if(this.comment_id!=undefined){
      formData.append("comment_id", this.comment_id);
    }
    formData.append("post", this.formPost.value.post);
    if(this.filedata != undefined){
      formData.append("post_file", this.filedata, this.filedata.name);
    }
    // Si la validación funciona pasará el mensaje que nos de al componente modal para que los saque por pantalla.
    this.postService.sendPost(formData)
      .subscribe((datos: any) => {
        if (datos['message'] == "Post creado") {
          window.location.reload();
        } else {
          console.log(datos);
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
            this.submit();
          }
        });
      });
  }

}
