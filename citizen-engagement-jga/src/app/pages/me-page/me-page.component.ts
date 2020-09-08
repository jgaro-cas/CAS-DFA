import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { MeService } from 'src/app/api/services/me.service';

@Component({
  selector: 'app-me-page',
  templateUrl: './me-page.component.html',
  styleUrls: ['./me-page.component.scss']
 
})
export class MePageComponent implements OnInit {

  meForm;
  

  constructor(private meService : MeService) { 

   }

  ngOnInit(): void {

  }

  onSubmit(meDatas){

  }
}
