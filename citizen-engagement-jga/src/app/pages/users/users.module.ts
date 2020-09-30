import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule} from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCardModule } from "@angular/material/card";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatExpansionModule } from '@angular/material/expansion';
import { UserPageComponent } from './user-page/user-page.component'; 
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [UsersListComponent, UserPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatCardModule,
    FontAwesomeModule,
    MatExpansionModule,
    MatSelectModule
  ]
})
export class UsersModule { }
