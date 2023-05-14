import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class MaterialModuleModule { }
