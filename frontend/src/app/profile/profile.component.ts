import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService) { }
  username!:string;
  user!:any;

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((parametro: ParamMap) => {
      this.username = parametro.get("username")!;
    })

    this.postService.getOtherUser(this.username).subscribe((datos:any) => {
      this.user = datos["user"][0];
      console.log(this.user);
    })
  }

}
