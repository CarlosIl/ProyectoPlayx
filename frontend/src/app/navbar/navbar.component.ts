import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
//Para buscador
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

export interface User {
  profile_picture: string;
  username: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  username!: any;
  profile!: any;

  //Para buscador
  users: User[] = [];
  myControl = new FormControl('');
  filteredOptions: any;
  search_value!: string;


  constructor(private postService: PostService, private router: Router) {
    //Para buscador
    this.postService.getAllUsers().subscribe((users: any) => {
      for (let i = 0; i < users.length; i++) {
        if (users[i]["profile_picture"] == null) {
          users[i]["profile_picture"] = "../../assets/imgs/profile.jpg"
        }
        this.users.push(users[i]);
      }
    })

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(user => (user ? this._filterStates(user) : this.users.slice())),
    );
  }
  //Para buscador
  private _filterStates(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.username.toLowerCase().includes(filterValue));
  }

  //Para buscador
  goToProfile() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/profile/' + this.search_value]));
  }

  ngOnInit() {
    this.postService.getMyUser().subscribe((datos: any) => {
      var user = datos['user']
      this.username = user['username'];
      if (user['profile_picture'] == null) {
        this.profile = "../../assets/imgs/profile.jpg"
      } else {
        // this.profile = user['profile_picture'];
        this.postService.getProfilePicture(this.username).subscribe((baseImage: any) => {
          this.profile = baseImage.url;
        })
      }
    })
  }

  goMyProfile() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/profile/' + this.username]));
  }
}
