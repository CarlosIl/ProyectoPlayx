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
  // Parámetro recogido de la ruta
  username!:string;
  // Para user-card
  user!:any;
  profile_picture!:string;
  // Para mostrar todos los posts de un usuario
  posts!: any;
  last_post_id!: number;
  MyUser!:boolean;

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((parametro: ParamMap) => {
      this.username = parametro.get("username")!;
    })

    this.postService.getMyUser().subscribe((datos: any) => {
      if(this.username == datos['user']['username']){
        this.MyUser = true;
      }else{
        this.MyUser = false;
      }
    });

    this.postService.getOtherUser(this.username).subscribe((datos:any) => {
      this.user = datos[0];
      if(!this.user){
        console.log("El usuario no existe");
      }else{
        if (this.user["profile_picture"] == null) {
          this.profile_picture = "../../assets/imgs/profile.jpg"
        } else {
          this.postService.getProfilePicture(this.username).subscribe((baseImage: any) => {
            this.profile_picture = baseImage.url;
          })
        }

        this.postService.getPostsX(this.username).subscribe((posts: any) => {
          this.last_post_id = posts[posts.length-1]["id"];
          this.posts = posts;
        })
      }
    })
  }

  reloadPosts() {
    if(this.last_post_id == 1){
      return console.log("No se puede avanzar más");
    }else{
      this.postService.reloadPostsX(this.username,this.last_post_id).subscribe((posts: any) => {
        for (let index = 0; index < posts.length; index++) {
          this.posts.push(posts[index]);
        }
        this.last_post_id = posts[posts.length-1]["id"];
      })
    }
  }

}
