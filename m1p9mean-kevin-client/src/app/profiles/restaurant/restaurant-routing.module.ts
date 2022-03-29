import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManagementComponent } from './management/management.component';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfitComponent } from './profit/profit.component';
import { RestaurantComponent } from './restaurant.component';

const routes: Routes = [{
  path: '',
  component : RestaurantComponent,
  children : [
    {
      path: "home",
      component: HomeComponent
    },
    {
      path: "orders",
      component: OrdersComponent
    },
    {
      path: "order/:orderId",
      component: OrderComponent
    },
    {
      path: "profit",
      component: ProfitComponent
    },
    {
      path: "management",
      component: ManagementComponent
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
