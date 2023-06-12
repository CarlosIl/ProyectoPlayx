import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';

export interface User {
  profile_picture: string;
  username: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  users: User[] = [];
  myControl = new FormControl('');
  filteredOptions: any;

  username!:string;

  constructor(private postService: PostService, private router: Router) {
    this.postService.getAllUsers().subscribe((users: any) => {
      for (let i = 0; i < users.length; i++) {
        if (users[i]["profile_picture"] == null) {
          users[i]["profile_picture"] = "../../assets/imgs/profile.png"
        }
        this.users.push(users[i]);
      }
    })

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(user => (user ? this._filterStates(user) : this.users.slice())),
    );
  }

  private _filterStates(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.username.toLowerCase().includes(filterValue));
  }

  goProfile() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/profile/'+this.username]));
  }

}
