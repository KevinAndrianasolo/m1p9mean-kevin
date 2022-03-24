import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ClientComponent } from './profiles/client/client.component';
import { DeliveryManComponent } from './profiles/delivery-man/delivery-man.component';
import { EKalyComponent } from './profiles/e-kaly/e-kaly.component';
import { RestaurantComponent } from './profiles/restaurant/restaurant.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "client",
    component: ClientComponent
  },
  {
    path: "restaurant",
    component: RestaurantComponent
  },
  {
    path: "delivery-man",
    component: DeliveryManComponent
  },
  {
    path: "e-kaly",
    component: EKalyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
