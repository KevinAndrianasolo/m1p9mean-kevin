import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard/auth-guard.service';
import { BasketComponent } from './basket/basket.component';
import { ClientComponent } from './client.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { OrdersComponent } from './orders/orders.component';
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
        canActivate: [AuthGuardService]
      },
      {
        path: "signup",
        component: SignupComponent
      },
      {
        path: "restaurants",
        component: RestaurantsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "basket",
        component: BasketComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "orders",
        component: OrdersComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "restaurant/:restaurantId",
        component: RestaurantComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "menu/:menuId",
        component: MenuComponent,
        canActivate: [AuthGuardService]
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
