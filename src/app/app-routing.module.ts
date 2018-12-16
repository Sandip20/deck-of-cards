import { ProfileComponent } from './controllers/profile/profile.component';
import { AuthGuard } from './services/auth-guard.service';
import { SignupComponent } from './controllers/signup/signup.component';
import { LoginComponent } from './controllers/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './controllers/home/home.component';

//canActivate: [AuthGuard],
const routes: Routes = [{
  path: 'home', canActivate: [AuthGuard], component: HomeComponent,

},
{
  path: 'profile', canActivate: [AuthGuard], component: ProfileComponent,

},
{
  path: 'login', component: LoginComponent
}, {
  path: 'register', component: SignupComponent
},
{ path: '**', redirectTo: '/login', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
