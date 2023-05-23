import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
//Para buscador
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  profile_picture!: any;

  //Para buscador
  users: User[] = [];
  myControl = new FormControl('');
  filteredOptions: any;
  search_value!: string;


  constructor(private postService: PostService, private router: Router, private snackBar: MatSnackBar) {


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
    let search = this.search_value;
    this.search_value = "";
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/profile/' + search]));
  }

  ngOnInit() {
    this.postService.getMyUser().subscribe((datos: any) => {
      var user = datos['user']
      this.username = user['username'];
      this.profile_picture = user['profile_picture'];

      //Para buscador
      this.postService.getAllUsers().subscribe((users: any) => {
        for (let i = 0; i < users.length; i++) {
          this.users.push(users[i]);
        }
      })

    }, (err) => {
      if (err.statusText == "Unknown Error") {
        this.snackBar.open("ERROR: No se puede conectar con el servidor", "OK", {
          duration: 10000,
          panelClass: 'app-notification-error'
        });
      } else if (err.statusText == "Internal Server Error") {
        this.snackBar.open("ERROR: No se puede conectar con la base de datos", "OK", {
          duration: 10000,
          panelClass: 'app-notification-error'
        });
      }
    })
  }

  goMyProfile() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/profile/' + this.username]));
  }
}
