import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component : ClientComponent,
    children : [
      {
        path: "home",
        component: HomeComponent,
        // canActivate: [AuthGuardService]
      },
      {
        path: "signup",
        component: SignupComponent
      },
      {
        path: "restaurants",
        component: RestaurantsComponent
      },
      {
        path: "restaurant/:restaurantId",
        component: RestaurantComponent
      },
      {
        path: "menu/:menuId",
        component: MenuComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
