import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  receivedUser : User

  constructor() { }

  ngOnInit(): void { 
    console.log(history.state);
    this.receivedUser = history.state;
   }

  displayUser(){
    console.log("User :", this.receivedUser);
  }

}
