import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { PostService } from '../services/post.service';

// export interface User {
//   username: string;
//   profile_picture: string;
// }

export interface State {
  profile_picture: string;
  username: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  // myControl = new FormControl('');
  // options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: any;
  users: State[] = [];

  myControl = new FormControl('');
  filteredOptions: any;

  constructor(private postService: PostService) {
    this.postService.getAllUsers().subscribe((users: any) => {
      for (let i = 0; i < users.length; i++) {
        this.users.push(users[i]);
      }
    })

    console.log(this.users);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(user => (user ? this._filterStates(user) : this.users.slice())),
    );

  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(user => user.username.toLowerCase().includes(filterValue));
  }

}
