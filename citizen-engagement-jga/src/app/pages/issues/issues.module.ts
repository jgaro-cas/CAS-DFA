import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatExpansionModule } from '@angular/material/expansion';
import { IssuesListComponent } from "./issues-list/issues-list.component";
import { IssuePageComponent } from "./issue-page/issue-page.component";
import { MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips'; 
import { MatButtonModule } from "@angular/material/button";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule} from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { AppRoutingModule } from './../../app-routing.module';
import { MatSelectModule } from "@angular/material/select";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@NgModule({
  declarations: [IssuesListComponent, IssuePageComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatChipsModule,
    MatButtonModule,
    FontAwesomeModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    AppRoutingModule,
    MatSelectModule,
    MatButtonToggleModule
  ]
})
export class IssuesModule { }
