import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatExpansionModule } from '@angular/material/expansion';
import { IssuesListComponent } from "./issues-list/issues-list.component";


@NgModule({
  declarations: [IssuesListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatExpansionModule
  ]
})
export class IssuesModule { }
