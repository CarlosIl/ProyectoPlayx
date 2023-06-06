import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
//Admin
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator'; 

import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CdkTreeModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    OverlayModule,
    PortalModule,
    MatBadgeModule,
    MatTooltipModule,
    InfiniteScrollModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ]
})
export class MaterialModuleModule { }
