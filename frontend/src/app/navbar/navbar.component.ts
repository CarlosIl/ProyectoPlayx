import { Component } from '@angular/core';
//For using methods to connect with the backend server
import { PostService } from '../services/post.service';
//Use to navigate to different paths 
import { Router } from '@angular/router';
//For Search
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
//For ModalComponent
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from "../modal/modal.component";

//Use it for search to store username and profile picture
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
  //Use to store username and profile picture of the current user
  username!: any;
  profile_picture!: any;

  //Use for search
  users: User[] = [];
  myControl = new FormControl('');
  filteredOptions: any;
  search_value!: string;

  constructor(private postService: PostService, private router: Router, private dialog: MatDialog) {
    //To filter users of the search input
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(user => (user ? this._filterUsers(user) : this.users.slice())),
    );
  }
  //To filter users of the search input
  private _filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.username.toLowerCase().includes(filterValue));
  }

  //Deletes search input data and redirect to the profile of that user
  goToProfile() {
    let search = this.search_value;
    this.search_value = "";
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/profile/' + search]));
  }

  ngOnInit() {
    //Retrieve user data
    this.postService.getMyUser().subscribe((datos: any) => {
      var user = datos['user']
      this.username = user['username'];
      this.profile_picture = user['profile_picture'];

      //For search input
      //Retrieve all users username and profile picture
      this.postService.getAllUsers().subscribe((users: any) => {
        for (let i = 0; i < users.length; i++) {
          this.users.push(users[i]);
        }
      })

    }, (err) => {
      //Stops loading the page
      window.stop();

      console.log(err);
      let error_message;
      let action;
      
      //No connection to backend server
      if (err.statusText == "Unknown Error") {
        error_message = "Can't connect to server";
        action = "Try again";
      //No connection with database
      } else{
        error_message = err.error.message;
      }

      const dialogRef = this.dialog.open(ModalComponent, {
        width: '400px',
        data: {
          message: error_message,
          action: action,
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        //If the user click the action button executes these lines
        if (result == true) {
          console.log("Ejecutar acción")
          window.location.reload();
        }
        console.log('Modal cerrado');
        // history.back();
      });

    })
  }

  //Redirect to current user profile
  goMyProfile() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/profile/' + this.username]));
  }
}
