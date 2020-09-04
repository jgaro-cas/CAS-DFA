import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MePageComponent } from './me-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule} from '@angular/forms';
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [MePageComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [MePageComponent]
})
export class MePageModule { }
