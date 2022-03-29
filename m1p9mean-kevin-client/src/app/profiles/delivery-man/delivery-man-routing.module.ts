import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryManComponent } from './delivery-man.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [{
  path: '',
  component : DeliveryManComponent,
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
export class DeliveryManRoutingModule { }
