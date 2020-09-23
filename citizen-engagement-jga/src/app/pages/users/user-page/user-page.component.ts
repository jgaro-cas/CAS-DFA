import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    this.receivedUser = history.state['user'];
    console.log('User : ', this.receivedUser);
   }

  displayUser(){
    console.log("User :", this.receivedUser);
  }

  getUserFirstLastName(){
    return `${this.receivedUser.firstname} ${this.receivedUser.lastname}`;
  }


  onSubmit(datas : NgForm){
    ;
  }
}
