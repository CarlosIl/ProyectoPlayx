import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  action!:string;
  constructor(public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(){
    this.action = this.data.action;
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
