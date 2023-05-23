import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private fb: FormBuilder) { }
    // Parámetro recogido de la ruta
    id!:string;
    post_content:any;
    //Para respuesta
    formPostComment!: FormGroup;
    filedata: any;
    imagePreview!: string;
    isImage:boolean = false;

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((parametro: ParamMap) => {
      this.id = parametro.get("id")!;
    })

    this.formPostComment = this.fb.group({
      post: ['', [Validators.nullValidator]],
      post_file: ['', [Validators.nullValidator]]
    })

    this.postService.getPost(this.id).subscribe((post:any) => {
      this.post_content = post[0];
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
    if(this.formPostComment.value.post != "" || this.isImage == true){
      if (this.formPostComment.invalid) {
        return console.log(this.formPostComment);
      }
    }

    let formData = new FormData();
    formData.append("comment_id", this.id);
    formData.append("post", this.formPostComment.value.post);
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
