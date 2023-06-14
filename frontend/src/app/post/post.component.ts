import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private router: Router) { }
    // Parámetro recogido de la ruta
    id!:string;
    post_content:any;

    comments!:any;
    last_comment_id!: number;

    nada:boolean = false;
    message!:string;
    final:boolean = false;

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
      }else if(comments.length<10){
        this.last_comment_id == 0
        this.comments = comments;
      }
      else{
        this.last_comment_id = comments[comments.length-1]["id"];
        this.comments = comments;
      }
    })
  }

  reloadComments() {
    if (this.last_comment_id == 1) {
      this.final = true;
    } else {
      this.postService.reloadComments(this.id,this.last_comment_id).subscribe((comments: any) => {
        for (let index = 0; index < comments.length; index++) {
          this.comments.push(comments[index]);
        }

        if (comments.length == 0) {
          this.final = true;
        }else if(comments.length<3){
          this.last_comment_id == 1;
        } else {
          this.last_comment_id = comments[comments.length - 1]["id"];
        }
      })
    }
  }

  redirectCreatePost() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/create/'+this.id]));
  }

}
