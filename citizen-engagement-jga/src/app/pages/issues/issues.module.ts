import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatExpansionModule } from '@angular/material/expansion';
import { IssuesListComponent } from "./issues-list/issues-list.component";
import { MatChipsModule } from '@angular/material/chips'; 
import { MatButtonModule } from "@angular/material/button";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [IssuesListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatChipsModule,
    MatButtonModule,
    FontAwesomeModule
  ]
})
export class IssuesModule { }
