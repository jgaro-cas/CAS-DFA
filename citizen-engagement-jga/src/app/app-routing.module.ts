import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './security/login-page/login-page.component';
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { AuthGuard } from './security/guards/auth.guard';
import { PageAccueilComponent } from './pages/page-accueil/page-accueil.component';
import { MePageComponent } from './pages/me-page/me-page.component';
import { UsersListComponent } from "./pages/users/users-list/users-list.component";
import { UserPageComponent } from './pages/users/user-page/user-page.component';
import { IssuesListComponent } from "./pages/issues/issues-list/issues-list.component";
import { User } from './models/user';
import { IssuePageComponent } from './pages/issues/issue-page/issue-page.component';

const routes: Routes = [
  {path: "", redirectTo: "Accueil", pathMatch: "full"},
  {path: "login", redirectTo: "Accueil/login", pathMatch: "full"},
  {path: "Accueil", 
    component: PageAccueilComponent,
    children: [
      {path: "", redirectTo: "me", pathMatch: "full"},
      {path: "login", component: LoginPageComponent},
      {path: "me", component: MePageComponent, canActivate: [AuthGuard]},
      {path: "users", component: UsersListComponent, canActivate: [AuthGuard]},
      {path: "users/:id",component: UserPageComponent, canActivate: [AuthGuard]},
      {path: "issues", component: IssuesListComponent, canActivate: [AuthGuard]},
      {path: "issues/:id", component: IssuePageComponent, canActivate: [AuthGuard]}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
