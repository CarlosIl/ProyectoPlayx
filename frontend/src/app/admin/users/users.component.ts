import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { PostService } from 'src/app/services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from "../../modal/modal.component";
import { Router } from '@angular/router';

export interface User {
  id: string;
  profile_picture: string;
  username: string;
  email: string;
  is_email_verified: boolean;
  type: boolean;
}

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 12, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 13, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 15, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 16, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 17, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 18, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 19, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'profile_picture', 'username', 'email', 'is_email_verified', 'type', 'actions'];
  dataSource!: MatTableDataSource<User>;
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(private postService: PostService, private dialog: MatDialog, private router: Router){

    this.postService.getMyUser().subscribe((datos: any) => {
      var user = datos['user']
      if(user['type'] == 1){
        this.postService.getAllUsers().subscribe((users: any) => {
          for (let i = 0; i < users.length; i++) {
            if (users[i]["profile_picture"] == null) {
              users[i]["profile_picture"] = "../../assets/imgs/profile.png"
            }
          }
          this.dataSource = new MatTableDataSource(users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, (err) => {
          console.log(err);
        })
      }else{
        window.stop();

        const dialogRef = this.dialog.open(ModalComponent, {
          width: '400px',
          data: {
            message: "You are not allowed in this page. Admins only!",
            action: "Go to home",
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          //If the user click the action button executes these lines
          if (result == true) {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/home']));
          }
          console.log('Modal cerrado');
          // history.back();
        });

      }
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: any){
    this.postService.deleteUser(id).subscribe((datos:any) => {
      if (datos['success'] == true) {
        
        const dialogRef = this.dialog.open(ModalComponent, {
          width: '400px',
          data: {
            message: "User has been deleted succesfully",
            good: true,
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          window.location.reload();
        });

      } else {
        return console.log(datos);
      }
    })
  }

  modifyUser(id: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/edit/'+id]));
  }
}
