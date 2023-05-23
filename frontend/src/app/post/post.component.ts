import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService) { }
    // Parámetro recogido de la ruta
    id!:number;
    post:any;

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((parametro: ParamMap) => {
      this.id = Number(parametro.get("id")!);
    })

    this.postService.getPost(this.id).subscribe((post:any) => {
      this.post = post[0];
    })
  }
}
