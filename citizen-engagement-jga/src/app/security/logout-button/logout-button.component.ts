import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout-button',
  template: '<button (click)="logout()">Logout</button>',
})
export class LogoutButtonComponent implements OnInit {

  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }

}
