import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from "@angular/forms";
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  @Input() comment_id!:string;
  formPost!: FormGroup;
  filedata: any;
  imagePreview!: string;
  isImage:boolean = false;

  constructor(private fb: FormBuilder, private postService: PostService) { }

  ngOnInit() {
    this.formPost = this.fb.group({
      post: ['', [Validators.nullValidator]],
      post_file: ['', [Validators.nullValidator]]
    })
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
    if(this.formPost.value.post != "" || this.isImage == true){
      if (this.formPost.invalid) {
        return console.log(this.formPost);
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
      });
  }

}
