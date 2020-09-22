import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './security/login-page/login-page.component';
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { AuthGuard } from './security/guards/auth.guard';
import { PageAccueilComponent } from './pages/page-accueil/page-accueil.component';
import { MePageComponent } from './pages/me-page/me-page.component';
import { UsersListComponent } from "./pages/users/users-list/users-list.component";

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
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
