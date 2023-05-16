import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from "@angular/forms";
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  formPost!: FormGroup;
  filedata: any;

  constructor(private fb: FormBuilder, private postService: PostService) { }

  ngOnInit() {
    this.formPost = this.fb.group({
      post: ['', [Validators.required]],
      post_file: ['', [Validators.nullValidator]],
    })
  }

  fileEvent(e: any) {
    this.filedata = e.target.files[0];
  }

  submit() {
    if (this.formPost.invalid) {
      return;
    }

    // Si la validación funciona pasará el mensaje que nos de al componente modal para que los saque por pantalla.
    this.postService.sendPost(this.formPost.value, this.filedata);
      // .subscribe((datos: any) => {
      //   if (datos['message'] == "Post creado") {
      //     window.location.reload();
      //   } else {
      //     return console.log(datos);
      //   }
      // });
  }

}
