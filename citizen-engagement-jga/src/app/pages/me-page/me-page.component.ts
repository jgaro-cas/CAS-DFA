import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-me-page',
  templateUrl: './me-page.component.html',
  styleUrls: ['./me-page.component.scss']
 
})
export class MePageComponent implements OnInit {

  meForm;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(meDatas){

  }
}
