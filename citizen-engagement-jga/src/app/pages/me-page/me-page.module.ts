import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MePageComponent } from './me-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [MePageComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule

  ],
  exports: [MePageComponent]
})
export class MePageModule { }
