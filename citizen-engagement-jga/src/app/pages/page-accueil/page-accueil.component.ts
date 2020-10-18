import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/security/auth.service';



@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent implements OnInit {
  private logged : boolean = false;
  public staffUser: boolean = false;

  constructor(private auth : AuthService) { }

  ngOnInit(): void {

  }
}
