import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  action!:string;
  good:boolean = false;
  constructor(public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(){
    this.action = this.data.action;
    if(this.data.good!=null){
      this.good = this.data.good;
    }
  }

  //buttonClose
  close() {
    this.dialogRef.close();
  }

  //buttonAction
  pressAction() {
    this.dialogRef.close(true);
  }
}
