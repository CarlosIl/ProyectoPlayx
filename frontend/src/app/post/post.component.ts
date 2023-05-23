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

    comments!:any;
    last_comment_id!: number;

    nada:boolean = false;
    message!:string;

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((parametro: ParamMap) => {
      this.id = parametro.get("id")!;
    })

    this.postService.getPost(this.id).subscribe((post:any) => {
      this.post_content = post[0];
    })

    this.postService.getComments(this.id).subscribe((comments:any) => {
      if(comments.length==0){
        this.nada = true;
        this.message = "There aren't any comments yet";
      }else{
        this.last_comment_id = comments[comments.length-1]["id"];
        this.comments = comments;
      }
    })
  }
}
